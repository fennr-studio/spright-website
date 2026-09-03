import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Wordmark. The mark is a single geometric glyph — two offset strokes forming
 * an upward step — drawn inline so it costs no request and inherits colour.
 */
export function Logo({
  className,
  onInk = false,
}: {
  className?: string;
  onInk?: boolean;
}) {
  return (
    <Link
      href="/"
      className={cn("group/logo inline-flex items-center gap-3", className)}
      aria-label="Spright Software Systems — home"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M3 18.5 10.2 7.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          className={onInk ? "text-cobalt-bright" : "text-cobalt"}
        />
        <path
          d="M10.2 18.5 17.4 7.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          opacity="0.55"
        />
        <path
          d="M17.4 18.5 24.6 7.5"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="square"
          opacity="0.25"
        />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[1.0625rem] font-extrabold tracking-[-0.03em]">
          Spright
        </span>
        <span
          className={cn(
            "mt-1 text-[0.6875rem] font-medium tracking-[0.02em]",
            onInk ? "text-ink-300" : "text-ink-400",
          )}
        >
          Software Systems
        </span>
      </span>
    </Link>
  );
}
