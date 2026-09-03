import { Section, Container } from "@/components/ui/Section";
import { CountUp } from "@/components/animations/CountUp";
import { Reveal } from "@/components/animations/Reveal";
import { stats } from "@/data/stats";

/**
 * Metrics.
 *
 * Three figures on a plain surface, separated by hairlines — no cards, no
 * boxes, no fills. The reference gives statistics their weight through scale
 * and space alone, and putting them in rounded containers is exactly what
 * makes a metrics row read as a template.
 *
 * Figures are published by Spright; see src/data/stats.ts.
 */
export function StatsBand() {
  return (
    <Section tone="paper" aria-labelledby="stats-heading">
      <Container>
        <h2 id="stats-heading" className="sr-only">
          Spright in numbers
        </h2>

        <dl className="grid gap-x-16 gap-y-14 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.08}>
              <div className="border-t border-mist-line pt-8">
                <dd className="tabular text-[clamp(3.25rem,6vw,5rem)] font-medium leading-[1.05] text-ink">
                  <CountUp value={stat.value} suffix={stat.suffix} />
                </dd>
                <dt className="mt-5 text-display-sm text-ink">{stat.label}</dt>
                <p className="mt-3 max-w-measure-sm text-body text-ink-500">
                  {stat.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </Container>
    </Section>
  );
}
