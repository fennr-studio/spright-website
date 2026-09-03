import "server-only";

/**
 * Transactional email boundary.
 *
 * Credentials are read from server-only environment variables and never leave
 * this module. When RESEND_API_KEY is unset — local development, preview
 * builds, CI — the payload is logged instead of sent so forms remain testable
 * without secrets. Swapping Resend for another provider means editing only
 * `deliver()` below.
 */

type EmailPayload = {
  subject: string;
  /** Plain text body. We never send user input as raw HTML. */
  text: string;
  replyTo?: string;
  attachments?: { filename: string; content: Buffer }[];
};

// `||`, not `??`: a declared-but-blank variable must fall back too, or
// enquiries are addressed to an empty string and vanish silently.
const FROM = process.env.CONTACT_FROM_EMAIL?.trim() || "website@sprightsoft.com";
const TO = process.env.CONTACT_TO_EMAIL?.trim() || "hr@sprightsoft.com";

export async function deliver(payload: EmailPayload): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.info(
      "[email] RESEND_API_KEY not configured — logging instead of sending.",
      { to: TO, subject: payload.subject },
    );
    return;
  }

  const { Resend } = await import("resend");
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: FROM,
    to: [TO],
    subject: payload.subject,
    text: payload.text,
    replyTo: payload.replyTo,
    attachments: payload.attachments?.map((a) => ({
      filename: a.filename,
      content: a.content,
    })),
  });

  if (error) {
    // Surface for server logs; the route handler returns a generic message so
    // provider details are never exposed to the browser.
    throw new Error(`Email delivery failed: ${error.name}`);
  }
}

/** Renders a label/value block safely as plain text. */
export function toPlainText(rows: [string, string | undefined][]): string {
  return rows
    .filter((row): row is [string, string] => Boolean(row[1]))
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");
}
