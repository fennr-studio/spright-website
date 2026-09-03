"use client";

import type { ReactNode, SelectHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded-card border bg-paper-raised px-4 py-3.5 text-[0.9375rem] text-ink transition-colors duration-200 placeholder:text-ink-300 focus:border-ink";

function Wrapper({
  id,
  label,
  error,
  hint,
  optional,
  children,
  className,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="text-meta font-semibold text-ink-600">
        {label}
        {optional ? (
          <span className="ml-2 font-normal text-ink-400">Optional</span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="text-meta text-ink-400">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="text-meta font-medium text-cobalt-dark">
          {error}
        </p>
      ) : null}
    </div>
  );
}

type BaseProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  className?: string;
};

export function TextField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  ...rest
}: BaseProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <input
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, error ? "border-cobalt-dark" : "border-mist-line")}
        {...rest}
      />
    </Wrapper>
  );
}

export function SelectField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  options,
  placeholder = "Please choose",
  ...rest
}: BaseProps & { options: readonly string[]; placeholder?: string } & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <select
        id={id}
        name={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "appearance-none", error ? "border-cobalt-dark" : "border-mist-line")}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Wrapper>
  );
}

export function TextAreaField({
  id,
  label,
  error,
  hint,
  optional,
  className,
  rows = 5,
  ...rest
}: BaseProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrapper id={id} label={label} error={error} hint={hint} optional={optional} className={className}>
      <textarea
        id={id}
        name={id}
        rows={rows}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(control, "resize-y", error ? "border-cobalt-dark" : "border-mist-line")}
        {...rest}
      />
    </Wrapper>
  );
}

/**
 * Honeypot. Hidden from sight and from assistive technology, but present in
 * the DOM — automated submitters fill it in and are rejected server-side.
 */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website">Leave this field empty</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}
