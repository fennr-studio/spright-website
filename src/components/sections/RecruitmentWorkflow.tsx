import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { RevealItem } from "@/components/animations/Reveal";
import { recruitmentWorkflow } from "@/data/process";
import { pad } from "@/lib/utils";

/**
 * The recruitment procedure itself — every stage the company runs, from
 * identifying the requirement through to references — laid out as a workflow
 * rather than a bullet list.
 */
export function RecruitmentWorkflow() {
  return (
    <Section tone="mist" aria-labelledby="workflow-heading">
      <Container>
        <SectionIntro
          marker="Recruitment procedure"
          headingId="workflow-heading"
          align="split"
          heading="Every stage, in the open."
          lede="From identifying the need behind a role to gathering references before it is filled — this is the whole procedure, not a summary of it."
        />

        <ol className="mt-16 grid gap-px bg-mist-deep/70 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {recruitmentWorkflow.map((stage, index) => (
            <RevealItem
              key={stage.id}
              delay={Math.min(index, 3) * 0.05}
              className="group relative bg-mist p-8 transition-colors duration-500 ease-editorial hover:bg-paper lg:p-10"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="text-[1.375rem] font-semibold tracking-[-0.02em]">
                  {stage.title}
                </h3>
                <span className="tabular text-meta font-semibold text-ink-400">
                  {pad(index + 1)}
                </span>
              </div>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                {stage.description}
              </p>
              <ul className="mt-6 space-y-2">
                {stage.activities.map((activity) => (
                  <li
                    key={activity}
                    className="flex gap-2.5 text-meta text-ink-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-px w-3 shrink-0 bg-cobalt"
                    />
                    {activity}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
