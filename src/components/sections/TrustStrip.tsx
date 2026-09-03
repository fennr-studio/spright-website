import { Section, Container } from "@/components/ui/Section";
import { industries } from "@/data/industries";

/**
 * Credibility strip.
 *
 * The reference runs a scrolling row of client logos here. Spright publishes
 * no client list, and inventing logos on a recruitment site would be a plain
 * misrepresentation — so the slot keeps its visual rhythm and carries what is
 * actually verifiable instead.
 *
 * That means the published domains and nothing else. An earlier version mixed
 * three technology areas into this row, which was wrong twice over: the row is
 * labelled "Recruiting across", and a technology domain is not a sector; and
 * those three names ("Enterprise technology", "Software engineering",
 * "Quality engineering") are our own rewordings rather than anything Spright
 * publishes. The live site names four technology areas only — ERP,
 * development, testing and delivery — and they belong on the technology page.
 */
export function TrustStrip() {
  return (
    <Section tone="mist" spacing="compact" aria-labelledby="trust-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <h2
            id="trust-heading"
            className="shrink-0 text-body font-normal text-ink-500"
          >
            Recruiting across
          </h2>

          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 lg:justify-end lg:gap-x-10">
            {industries.map((industry) => (
              <li key={industry.id} className="text-body text-ink">
                {industry.name}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
