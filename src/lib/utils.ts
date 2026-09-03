import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge conditional class names, resolving Tailwind conflicts predictably. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** `01`, `02`, … for sequence markers. */
export function pad(n: number) {
  return n.toString().padStart(2, "0");
}
