import { NextResponse } from "next/server";
import { contactSchema, fieldErrors } from "@/lib/validation";
import { clientKey, rateLimit } from "@/lib/rate-limit";
import { deliver, toPlainText } from "@/lib/email";

export const runtime = "nodejs";
/** Never cached — this route only ever handles mutations. */
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;

export async function POST(request: Request) {
  // 1. Throttle before doing any work.
  const limit = rateLimit(clientKey(request.headers, "contact"), {
    limit: 5,
    windowMs: 60_000,
  });
  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many messages from this address. Try again shortly." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  // 2. Reject oversized or non-JSON payloads outright.
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Message is too large." }, { status: 413 });
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  // 3. Validate with the same schema the browser used.
  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Please check the highlighted fields.", fields: fieldErrors(parsed.error) },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // 4. Honeypot. Respond 200 so bots learn nothing from the difference.
  if (data.website) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  try {
    await deliver({
      subject: `Website enquiry — ${data.company} (${data.service})`,
      replyTo: data.email,
      text: toPlainText([
        ["Name", data.name],
        ["Company", data.company],
        ["Email", data.email],
        ["Phone", data.phone || undefined],
        ["Service", data.service],
        ["", ""],
        ["Message", data.message],
      ]),
    });
  } catch (error) {
    // Log the detail server-side; return something generic to the browser.
    console.error("[contact] delivery failed", error);
    return NextResponse.json(
      { error: "We could not send that just now. Please email hr@sprightsoft.com." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
