import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { valueProps } from "@/data/values";

/**
 * Why organizations work with us.
 *
 * The reference runs client testimonials here. Spright publishes none, and
 * inventing quotes and attributing them to named people would be fabricating
 * evidence — so the slot keeps its position and weight in the page and
 * carries verified company strengths instead.
 */
export function WhySpright() {
  return (
    <Section tone="paper" aria-labelledby="why-heading">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] lg:gap-16">
          <div>
            <p className="eyebrow">Why Spright</p>
            <h2
              id="why-heading"
              className="mt-5 text-display-lg text-balance text-ink"
            >
              Why organizations work with us.
            </h2>
            <p className="mt-7 max-w-measure text-lede text-ink-500">
              No testimonials on this page — we would rather state what is
              actually true about how we work.
            </p>
          </div>

          <ul className="grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {valueProps.slice(0, 6).map((value, i) => (
              <Reveal key={value.id} delay={i * 0.05}>
                <li className="border-t border-mist-line pt-6">
                  <h3 className="text-display-sm text-ink">{value.title}</h3>
                  <p className="mt-3 text-body text-ink-500">
                    {value.description}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
