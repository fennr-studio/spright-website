"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Loader2, Paperclip, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import {
  careerSchema,
  experienceBands,
  expertiseAreas,
  fieldErrors,
  RESUME_EXTENSIONS,
  validateResume,
} from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

/**
 * Talent-network registration.
 *
 * The submission is multipart because of the résumé. Both the file constraints
 * and the text fields are checked here and again in the route handler; the
 * client checks exist to save the visitor a round trip, not to secure anything.
 */
export function CareerForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [resumeName, setResumeName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function clearResume() {
    setResumeName(null);
    setErrors((current) => {
      const next = { ...current };
      delete next.resume;
      return next;
    });
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const form = event.currentTarget;
    const formData = new FormData(form);
    const file = formData.get("resume");
    const resume = file instanceof File && file.size > 0 ? file : null;

    const resumeError = validateResume(resume);
    const parsed = careerSchema.safeParse(
      Object.fromEntries(
        [...formData.entries()].filter(([key]) => key !== "resume"),
      ),
    );

    if (!parsed.success || resumeError) {
      setErrors({
        ...(parsed.success ? {} : fieldErrors(parsed.error)),
        ...(resumeError ? { resume: resumeError } : {}),
      });
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const body = new FormData();
      for (const [key, value] of Object.entries(parsed.data)) {
        if (typeof value === "string") body.append(key, value);
      }
      if (resume) body.append("resume", resume);

      const response = await fetch("/api/careers", { method: "POST", body });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string; fields?: Record<string, string> }
          | null;
        if (payload?.fields) setErrors(payload.fields);
        setFormError(
          payload?.error ??
            "We could not submit that just now. Please try again, or email hr@sprightsoft.com.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
      form.reset();
      setResumeName(null);
    } catch {
      setFormError(
        "The request did not reach us. Check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-card border border-mist-line bg-paper-raised p-10"
      >
        <span className="inline-flex size-11 items-center justify-center rounded-full bg-cobalt text-white">
          <Check aria-hidden="true" className="size-5" />
        </span>
        <h3 className="mt-6 text-display-sm font-medium tracking-[-0.025em]">
          You are in our network.
        </h3>
        <p className="mt-4 max-w-measure text-body text-ink-500">
          Thanks for sending your details. We will be in touch when a role
          matches your expertise — and we will not send you anything that does
          not.
        </p>
        <Button variant="outline" className="mt-8" onClick={() => setStatus("idle")}>
          Submit another profile
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate encType="multipart/form-data" className="relative">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField id="name" label="Full name" autoComplete="name" error={errors.name} />
        <TextField
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          inputMode="email"
          error={errors.email}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          error={errors.phone}
        />
        <TextField
          id="location"
          label="Location"
          autoComplete="address-level2"
          placeholder="City, country"
          error={errors.location}
        />
        <SelectField
          id="expertise"
          label="Primary expertise"
          options={expertiseAreas}
          error={errors.expertise}
        />
        <SelectField
          id="experience"
          label="Years of experience"
          options={experienceBands}
          error={errors.experience}
        />
        <TextField
          id="linkedin"
          label="LinkedIn profile"
          type="url"
          placeholder="https://linkedin.com/in/…"
          optional
          error={errors.linkedin}
          className="sm:col-span-2"
        />

        <div className="flex flex-col gap-2 sm:col-span-2">
          <label htmlFor="resume" className="text-meta font-semibold text-ink-600">
            Résumé
            <span className="ml-2 font-normal text-ink-400">Optional</span>
          </label>

          <div className="flex flex-wrap items-center gap-4">
            <label
              htmlFor="resume"
              className="inline-flex h-11 cursor-pointer items-center gap-2.5 rounded-pill border border-ink/25 px-5 text-[0.9375rem] font-semibold transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              <Paperclip aria-hidden="true" className="size-4" />
              Choose file
            </label>
            {resumeName ? (
              <span className="inline-flex items-center gap-2 text-meta text-ink-500">
                {resumeName}
                <button
                  type="button"
                  onClick={clearResume}
                  className="rounded-full p-1 hover:bg-mist"
                >
                  <span className="sr-only">Remove {resumeName}</span>
                  <X aria-hidden="true" className="size-3.5" />
                </button>
              </span>
            ) : null}
          </div>

          <input
            ref={fileInputRef}
            id="resume"
            name="resume"
            type="file"
            accept={RESUME_EXTENSIONS.join(",")}
            className="sr-only"
            aria-describedby={errors.resume ? "resume-error" : "resume-hint"}
            onChange={(event) => {
              const file = event.target.files?.[0] ?? null;
              const error = validateResume(file);
              setResumeName(error ? null : (file?.name ?? null));
              setErrors((current) => ({ ...current, resume: error ?? "" }));
              if (error && fileInputRef.current) fileInputRef.current.value = "";
            }}
          />

          {errors.resume ? (
            <p id="resume-error" className="text-meta font-medium text-cobalt-dark">
              {errors.resume}
            </p>
          ) : (
            <p id="resume-hint" className="text-meta text-ink-400">
              PDF, DOC or DOCX, up to 5 MB.
            </p>
          )}
        </div>

        <TextAreaField
          id="message"
          label="Anything else"
          placeholder="The kind of work you want next, notice period, location preferences."
          optional
          error={errors.message}
          className="sm:col-span-2"
        />
      </div>

      <div aria-live="polite" className="mt-6 min-h-[1.25rem]">
        {formError ? (
          <p className="text-meta font-medium text-cobalt-dark">{formError}</p>
        ) : null}
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
        >
          {status === "submitting" ? (
            <>
              <Loader2 aria-hidden="true" className="size-4 animate-spin" />
              Submitting
            </>
          ) : (
            <>
              Join the talent network
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
        <p className="max-w-measure-sm text-meta text-ink-400">
          Your details are used to match you to roles. See our{" "}
          <a href="/privacy-policy" className="link-underline font-medium">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
