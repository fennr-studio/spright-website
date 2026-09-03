"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/ui/Section";
import { engagementProcess } from "@/data/process";
import { images } from "@/lib/images";
import { cn } from "@/lib/utils";

/**
 * How we work.
 *
 * This is the one near-black section on the page, and in the reference it is
 * the interactive moment: an asymmetric two-column split (471/629 on a 100px
 * gap) with the step list on the left and the supporting panel on the right,
 * the panel swapping as you move between steps.
 *
 * Selection is by hover and focus rather than click, so a pointer user never
 * has to commit and a keyboard user reaches every step by tabbing. The panel
 * is not a card stack — it is one surface whose contents change, which is why
 * this reads as a process rather than as five boxes.
 */
export function ProcessTimeline() {
  const steps = engagementProcess.slice(0, 5);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const current = steps[active]!;

  return (
    <Section tone="ink" aria-labelledby="process-heading">
      <Container>
        <div className="max-w-2xl">
          <p className="eyebrow text-white/45 before:bg-cobalt-bright">
            How we work
          </p>
          <h2
            id="process-heading"
            className="mt-5 text-display-lg text-balance text-white"
          >
            Smart steps to the right hire.
          </h2>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,471fr)_minmax(0,629fr)] lg:gap-[100px]">
          {/* Steps */}
          <ul className="flex flex-col">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex w-full items-baseline gap-6 border-t border-white/12 py-6 text-left last:border-b"
                  >
                    <span
                      className={cn(
                        "tabular text-meta transition-colors duration-300",
                        isActive ? "text-cobalt-bright" : "text-white/35",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "text-display-sm transition-colors duration-300",
                        isActive ? "text-white" : "text-white/50 group-hover:text-white/80",
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Panel */}
          <div className="relative min-h-[420px] overflow-hidden rounded-card bg-white/[0.04] lg:min-h-[520px]">
            <div className="absolute inset-0">
              <Image
                src={images.collaboration.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover opacity-25"
              />
            </div>

            <div className="relative flex h-full flex-col justify-end p-8 lg:p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="tabular text-meta text-cobalt-bright">
                    Step {String(active + 1).padStart(2, "0")} of{" "}
                    {String(steps.length).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 text-display-md text-white">
                    {current.title}
                  </h3>
                  <p className="mt-4 max-w-measure text-lede text-white/70">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
