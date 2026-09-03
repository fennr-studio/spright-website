"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts a statistic up once, when it first enters the viewport.
 *
 * The correct figure is the RESTING STATE, not the end of an animation. The
 * previous version initialised the visible number to 0 and relied on
 * requestAnimationFrame to reach the real value — which meant that any time
 * the animation did not finish, the page displayed a false statistic. A tab
 * opened in the background is enough to do it: browsers throttle rAF there,
 * so "250+ specialists" renders as "7+" until the tab is focused.
 *
 * So: render the true value from the first paint, and only drop to zero at
 * the moment an animation is actually going to run. If the document is
 * hidden, or becomes hidden mid-count, snap to the final figure rather than
 * leaving a wrong one on screen.
 */
export function CountUp({
  value,
  suffix = "",
  duration = 1600,
}: {
  value: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, {
    once: true,
    margin: "0px 0px -20% 0px",
  });
  const reduced = useReducedMotion();

  // Correct from the very first paint, on the server and in the browser.
  const [display, setDisplay] = useState(value);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!inView || reduced || hasRun.current) return;
    if (typeof document !== "undefined" && document.visibilityState !== "visible") {
      return; // Never start a count the viewer cannot see.
    }

    hasRun.current = true;

    let frame = 0;
    const start = performance.now();
    // Ease-out cubic: fast off the mark, settles gently on the final figure.
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const settle = () => {
      cancelAnimationFrame(frame);
      setDisplay(value);
    };

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(progress) * value));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    setDisplay(0);
    frame = requestAnimationFrame(tick);

    // If the tab goes away mid-count, finish immediately rather than
    // freezing on a partial figure.
    document.addEventListener("visibilitychange", settle);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", settle);
    };
  }, [inView, reduced, value, duration]);

  return (
    <span ref={ref} className="tabular">
      <span aria-hidden="true">
        {display}
        {suffix}
      </span>
      <span className="sr-only">
        {value}
        {suffix}
      </span>
    </span>
  );
}
