import { NextResponse } from "next/server";
import {
  careerSchema,
  fieldErrors,
  RESUME_EXTENSIONS,
  RESUME_MAX_BYTES,
  RESUME_MIME_TYPES,
} from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { deliver, toPlainText } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Strips any path component a client may have supplied in the filename. */
function safeFilename(name: string) {
  return (
    name
      .split(/[\\/]/)
      .pop()
      ?.replace(/[^a-zA-Z0-9._-]/g, "_")
      .slice(0, 120) ?? "resume"
  );
}

export async function POST(request: Request) {
  const limit = rateLimit(clientKey(request.headers, "careers"), {
    limit: 3,
    windowMs: 10 * 60_000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const entries = Object.fromEntries(
    [...form.entries()].filter(([key]) => key !== "resume"),
  );

  const parsed = careerSchema.safeParse(entries);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Résumé: optional, but if present it is checked against size, MIME type and
  // extension before a single byte is read into memory as a Buffer.
  const uploaded = form.get("resume");
  let attachment: { filename: string; content: Buffer } | undefined;

  if (uploaded instanceof File && uploaded.size > 0) {
    if (uploaded.size > RESUME_MAX_BYTES) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fields: { resume: "Résumé must be 5 MB or smaller" } },
        { status: 413 },
      );
    }

    const filename = safeFilename(uploaded.name);
    const typeOk = (RESUME_MIME_TYPES as readonly string[]).includes(uploaded.type);
    const extOk = RESUME_EXTENSIONS.some((ext) =>
      filename.toLowerCase().endsWith(ext),
    );

    if (!typeOk || !extOk) {
      return NextResponse.json(
        { error: "Please check the highlighted fields.", fields: { resume: "Upload a PDF, DOC or DOCX file" } },
        { status: 415 },
      );
    }

    attachment = {
      filename,
      content: Buffer.from(await uploaded.arrayBuffer()),
    };
  }

  try {
    await deliver({
      subject: `Talent network — ${data.name} (${data.expertise})`,
      replyTo: data.email,
      text: toPlainText([
        ["Name", data.name],
        ["Email", data.email],
        ["Phone", data.phone],
        ["Location", data.location],
        ["Expertise", data.expertise],
        ["Experience", data.experience],
        ["LinkedIn", data.linkedin || undefined],
        ["Résumé", attachment ? attachment.filename : "Not supplied"],
        ["", ""],
        ["Message", data.message || undefined],
      ]),
      attachments: attachment ? [attachment] : undefined,
    });
  } catch (error) {
    console.error("[careers] delivery failed", error);
    return NextResponse.json(
      { error: "We could not submit that just now. Please email hr@sprightsoft.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
