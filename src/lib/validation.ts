import { z } from "zod";

/**
 * Shared schemas. The same object validates on the client (instant feedback)
 * and on the server (the boundary that actually matters), so the two can
 * never drift apart.
 */

/** Strips control characters and collapses runs of whitespace. */
const clean = (value: string) =>
  value.replace(/[\u0000-\u001F\u007F]/g, "").replace(/\s+/g, " ").trim();

const name = z
  .string()
  .transform(clean)
  .pipe(
    z
      .string()
      .min(2, "Enter your full name")
      .max(80, "Name is too long"),
  );

const email = z
  .string()
  .transform((v) => v.trim().toLowerCase())
  .pipe(z.string().email("Enter a valid email address").max(160));

const phone = z
  .string()
  .transform(clean)
  .pipe(
    z
      .string()
      .min(7, "Enter a reachable phone number")
      .max(24, "Phone number is too long")
      .regex(/^[+\d][\d\s()-]+$/, "Use digits, spaces, + ( ) or - only"),
  );

const message = z
  .string()
  .transform((v) => v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").trim())
  .pipe(
    z
      .string()
      .min(20, "Tell us a little more — 20 characters minimum")
      .max(2000, "Please keep this under 2000 characters"),
  );

/** Hidden field. Real people leave it empty; most bots fill it in. */
const honeypot = z.string().max(0, "Rejected").optional().or(z.literal(""));

export const serviceInterests = [
  "Contract staffing",
  "Contract-to-hire",
  "Permanent hiring",
  "Project-based support",
  "Technology hiring",
  "Something else",
] as const;

export const contactSchema = z.object({
  name,
  company: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Enter your company name").max(120)),
  email,
  phone: phone.optional().or(z.literal("")),
  service: z.enum(serviceInterests, {
    errorMap: () => ({ message: "Choose the service you're interested in" }),
  }),
  message,
  website: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;

export const expertiseAreas = [
  "Enterprise technology / ERP",
  "Software engineering",
  "Quality engineering",
  "Delivery & programme management",
  "Data & analytics",
  "Infrastructure & cloud",
  "Corporate & HR functions",
  "Other",
] as const;

export const experienceBands = [
  "0–2 years",
  "3–5 years",
  "6–9 years",
  "10–14 years",
  "15+ years",
] as const;

export const careerSchema = z.object({
  name,
  email,
  phone,
  location: z
    .string()
    .transform(clean)
    .pipe(z.string().min(2, "Where are you based?").max(120)),
  expertise: z.enum(expertiseAreas, {
    errorMap: () => ({ message: "Select your primary area of expertise" }),
  }),
  experience: z.enum(experienceBands, {
    errorMap: () => ({ message: "Select your years of experience" }),
  }),
  linkedin: z
    .string()
    .transform((v) => v.trim())
    .pipe(
      z
        .string()
        .url("Enter a full URL, including https://")
        .max(200)
        .refine(
          (v) => /(^https:\/\/)([a-z]{2,3}\.)?linkedin\.com\//i.test(v),
          "Enter a linkedin.com profile URL",
        ),
    )
    .optional()
    .or(z.literal("")),
  message: message.optional().or(z.literal("")),
  website: honeypot,
});

export type CareerInput = z.infer<typeof careerSchema>;

/** Résumé upload constraints, enforced on both sides of the boundary. */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB
export const RESUME_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;
export const RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"] as const;

export function validateResume(file: File | null): string | null {
  if (!file || file.size === 0) return null; // optional
  if (file.size > RESUME_MAX_BYTES) return "Résumé must be 5 MB or smaller";
  const typeOk = (RESUME_MIME_TYPES as readonly string[]).includes(file.type);
  const extOk = RESUME_EXTENSIONS.some((ext) =>
    file.name.toLowerCase().endsWith(ext),
  );
  if (!typeOk || !extOk) return "Upload a PDF, DOC or DOCX file";
  return null;
}

/** Maps a ZodError onto a `{ field: message }` object for form rendering. */
export function fieldErrors(error: z.ZodError): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) result[key] = issue.message;
  }
  return result;
}
