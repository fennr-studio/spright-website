"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Section, Container } from "@/components/ui/Section";
import { hiringModels } from "@/data/hiring-models";
import { cn } from "@/lib/utils";

/**
 * Flexible contracts, as a proper tab panel.
 *
 * Keyboard behaviour follows the WAI-ARIA tabs pattern: arrow keys move
 * between tabs, Home and End jump to the ends, and the panel is reachable with
 * Tab. Nothing here depends on hover.
 */
export function HiringModels() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const active = hiringModels[activeIndex] ?? hiringModels[0]!;

  const focusTab = (index: number) => {
    const next = (index + hiringModels.length) % hiringModels.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(hiringModels.length - 1);
        break;
      default:
        break;
    }
  };

  return (
    <Section aria-labelledby="models-heading">
      <Container>
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="flex items-center gap-3 text-meta font-medium text-ink-400">
              <span aria-hidden="true" className="h-px w-8 bg-cobalt" />
              Flexible contracts
            </p>
            <h2
              id="models-heading"
              className="mt-8 text-display-md font-medium text-balance"
            >
              We source recruits to suit any length of contract.
            </h2>
            <p className="mt-6 max-w-measure text-body text-ink-500">
              Choose the model that matches the work. Every one of them is
              backed by the same screening, the same administration, and the
              same people.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-x-12 gap-y-8 lg:mt-16 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="Hiring models"
            aria-orientation="vertical"
            onKeyDown={onKeyDown}
            className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
          >
            {hiringModels.map((model, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={model.id}
                  ref={(node) => {
                    tabRefs.current[index] = node;
                  }}
                  role="tab"
                  id={`model-tab-${model.id}`}
                  aria-selected={selected}
                  aria-controls={`model-panel-${model.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "relative shrink-0 whitespace-nowrap rounded-pill px-5 py-3 text-left text-[0.9375rem] font-semibold transition-colors duration-300 lg:w-full lg:whitespace-normal lg:rounded-none lg:border-t lg:border-mist-line lg:px-0 lg:py-6",
                    selected
                      ? "bg-ink text-paper lg:bg-transparent lg:text-ink"
                      : "bg-mist text-ink-500 hover:text-ink lg:bg-transparent",
                  )}
                >
                  <span className="lg:flex lg:items-center lg:gap-4">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "hidden size-1.5 rounded-full transition-colors lg:block",
                        selected ? "bg-cobalt" : "bg-mist-deep",
                      )}
                    />
                    <span className="lg:text-[1.125rem]">{model.name}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                role="tabpanel"
                id={`model-panel-${active.id}`}
                aria-labelledby={`model-tab-${active.id}`}
                tabIndex={0}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-card bg-mist p-8 lg:p-12"
              >
                <p className="text-meta font-semibold text-cobalt">
                  {active.bestFor}
                </p>
                <h3 className="mt-4 text-display-sm font-medium tracking-[-0.025em]">
                  {active.name}
                </h3>
                <p className="mt-5 max-w-measure text-body text-ink-500">
                  {active.description}
                </p>

                <dl className="mt-9 grid gap-6 border-t border-mist-line pt-7 sm:grid-cols-3">
                  {active.characteristics.map((item) => (
                    <div key={item.label}>
                      <dt className="text-meta text-ink-400">{item.label}</dt>
                      <dd className="mt-2 text-[0.9375rem] font-semibold leading-snug">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}
