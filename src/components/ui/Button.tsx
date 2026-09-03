import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Buttons, measured off the reference.
 *
 * Solid near-black, white label, 8px radius, 20px/40px padding at 16px in the
 * regular weight — deliberately not bold. The reference's hover is a quiet
 * tonal shift rather than a lift or a colour change; the only movement is the
 * trailing icon, which is why `group/btn` exists.
 */
const button = cva(
  "group/btn inline-flex items-center justify-center gap-2.5 rounded-card text-body font-normal leading-none transition-[background-color,color,border-color] duration-300 ease-editorial disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink-700",
        accent: "bg-cobalt text-white hover:bg-cobalt-dark",
        outline: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
        ghostOnInk: "border border-white/25 text-paper hover:border-transparent hover:bg-paper hover:text-ink",
        solidOnInk: "bg-paper text-ink hover:bg-white/85",
        quiet: "bg-mist text-ink hover:bg-mist-deep",
      },
      size: {
        sm: "px-[18px] py-3 text-meta",
        md: "px-8 py-4",
        lg: "px-10 py-5",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
);

type ButtonVariants = VariantProps<typeof button>;

type ButtonLinkProps = ButtonVariants & {
  href: string;
  children: ReactNode;
  className?: string;
} & Omit<ComponentProps<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  children,
  className,
  variant,
  size,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link href={href} className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = ButtonVariants &
  ComponentProps<"button"> & { children: ReactNode };

export function Button({
  children,
  className,
  variant,
  size,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cn(button({ variant, size }), className)} {...rest}>
      {children}
    </button>
  );
}

export { button as buttonVariants };
