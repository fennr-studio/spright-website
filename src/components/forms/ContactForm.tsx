"use client";

import { useState } from "react";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  Honeypot,
  SelectField,
  TextAreaField,
  TextField,
} from "@/components/forms/fields";
import { contactSchema, fieldErrors, serviceInterests } from "@/lib/validation";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const formData = new FormData(event.currentTarget);
    const payload = Object.fromEntries(formData.entries());

    // Client-side validation first, so the visitor gets feedback instantly.
    // The server re-validates the same schema — this is convenience, not trust.
    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      setErrors(fieldErrors(parsed.error));
      setStatus("idle");
      return;
    }

    setErrors({});
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string; fields?: Record<string, string> }
          | null;
        if (body?.fields) setErrors(body.fields);
        setFormError(
          body?.error ??
            "We could not send that just now. Please try again, or email hr@sprightsoft.com.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
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
          Message sent.
        </h3>
        <p className="mt-4 max-w-measure text-body text-ink-500">
          Thanks — it is with our team in Pune and Tampa. Someone will reply
          within one working day. If it is urgent, call{" "}
          <a href="tel:+919309066157" className="link-underline font-medium">
            +91 9309 066 157
          </a>
          .
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="relative">
      <Honeypot />

      <div className="grid gap-6 sm:grid-cols-2">
        <TextField
          id="name"
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Priya Sharma"
          error={errors.name}
        />
        <TextField
          id="company"
          label="Company"
          type="text"
          autoComplete="organization"
          placeholder="Company name"
          error={errors.company}
        />
        <TextField
          id="email"
          label="Work email"
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="you@company.com"
          error={errors.email}
        />
        <TextField
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+91 90000 00000"
          optional
          error={errors.phone}
        />
        <SelectField
          id="service"
          label="What do you need?"
          options={serviceInterests}
          error={errors.service}
          className="sm:col-span-2"
        />
        <TextAreaField
          id="message"
          label="Tell us about the role"
          placeholder="The role, the team it joins, the timeline, and anything that makes it hard to fill."
          error={errors.message}
          hint="A couple of sentences is plenty to start."
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
              Sending
            </>
          ) : (
            <>
              Send message
              <ArrowRight aria-hidden="true" className="size-4" />
            </>
          )}
        </Button>
        <p className="max-w-measure-sm text-meta text-ink-400">
          We use your details only to respond to this enquiry. See our{" "}
          <a href="/privacy-policy" className="link-underline font-medium">
            privacy policy
          </a>
          .
        </p>
      </div>
    </form>
  );
}
