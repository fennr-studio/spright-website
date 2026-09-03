"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
};

/**
 * Scroll reveal, used deliberately — on section openers and the first row of a
 * grid, not on every element. When a visitor prefers reduced motion the
 * content renders immediately, with no transform at all.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  distance = 18,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** The same reveal, rendered as a list item so list semantics stay intact. */
export function RevealItem({
  children,
  className,
  delay = 0,
  distance = 18,
}: RevealProps) {
  const reduced = useReducedMotion();

  if (reduced) return <li className={className}>{children}</li>;

  return (
    <motion.li
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </motion.li>
  );
}

/**
 * Image reveal mask: the photograph is uncovered rather than faded in.
 * One orchestrated moment per image.
 */
export function RevealMask({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(14% 0% 0% 0%)", opacity: 0 }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
