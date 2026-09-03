import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionProps = {
  children: ReactNode;
  className?: string;
  /** Renders as <section> by default; pass "div" for nested blocks. */
  as?: ElementType;
  id?: string;
  /** Applies the dark treatment, including focus-ring colours. */
  tone?: "paper" | "mist" | "ink";
  /** Vertical rhythm. `flush` opts out entirely. */
  spacing?: "default" | "compact" | "flush";
  "aria-labelledby"?: string;
};

/**
 * Three surfaces, alternating down the page as the reference does: white,
 * mist, and one near-black section that lands mid-page.
 */
const toneClasses: Record<NonNullable<SectionProps["tone"]>, string> = {
  paper: "bg-paper text-ink-500",
  mist: "bg-mist text-ink-500",
  ink: "on-ink bg-ink text-white/70",
};

const spacingClasses: Record<NonNullable<SectionProps["spacing"]>, string> = {
  default: "py-section",
  compact: "py-section-sm",
  flush: "",
};

export function Section({
  children,
  className,
  as: Tag = "section",
  id,
  tone = "paper",
  spacing = "default",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn(
        "relative isolate",
        toneClasses[tone],
        spacingClasses[spacing],
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("gutter", className)}>{children}</div>;
}
