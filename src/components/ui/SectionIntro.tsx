import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Standard section opener: a small structural marker, the heading, and an
 * optional lede. The marker is a hairline plus label — it encodes where you
 * are in the page rather than decorating the heading.
 */
export function SectionIntro({
  marker,
  heading,
  lede,
  children,
  align = "left",
  tone = "light",
  headingId,
  className,
}: {
  marker?: string;
  heading: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  align?: "left" | "split";
  tone?: "light" | "dark";
  headingId?: string;
  className?: string;
}) {
  const isDark = tone === "dark";

  const markerNode = marker ? (
    <div
      className={cn(
        "mb-5 flex items-center gap-2 text-eyebrow font-medium uppercase tracking-[0.14em]",
        isDark ? "text-ink-200" : "text-ink-400",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          isDark ? "bg-cobalt-bright" : "bg-cobalt",
        )}
      />
      {marker}
    </div>
  ) : null;

  if (align === "split") {
    return (
      <div className={cn("grid gap-x-16 gap-y-8 lg:grid-cols-12", className)}>
        <div className="lg:col-span-7">
          {markerNode}
          <h2
            id={headingId}
            className="text-display-lg text-balance text-ink"
          >
            {heading}
          </h2>
        </div>
        <div className="lg:col-span-5 lg:pt-16">
          {lede ? (
            <p
              className={cn(
                "max-w-measure text-lede text-pretty",
                isDark ? "text-ink-200" : "text-ink-500",
              )}
            >
              {lede}
            </p>
          ) : null}
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("max-w-3xl", className)}>
      {markerNode}
      <h2 id={headingId} className="text-display-lg text-balance text-ink">
        {heading}
      </h2>
      {lede ? (
        <p
          className={cn(
            "mt-6 max-w-measure text-lede text-pretty",
            isDark ? "text-ink-200" : "text-ink-500",
          )}
        >
          {lede}
        </p>
      ) : null}
      {children}
    </div>
  );
}
