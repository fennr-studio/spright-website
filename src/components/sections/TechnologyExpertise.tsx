import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealItem, RevealMask } from "@/components/animations/Reveal";
import { technologyAreas } from "@/data/technology";
import { images } from "@/lib/images";

/** Where the technical depth actually sits. */
export function TechnologyExpertise({ showLink = true }: { showLink?: boolean }) {
  return (
    <Section tone="ink" aria-labelledby="technology-heading">
      <Container>
        <div className="grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="flex items-center gap-3 text-meta font-medium text-ink-200">
                <span aria-hidden="true" className="h-px w-8 bg-cobalt-bright" />
                Technology
              </p>
              <h2
                id="technology-heading"
                className="mt-8 text-display-lg font-medium text-balance"
              >
                Technology that moves the business, not just the roadmap.
              </h2>
              <p className="mt-8 max-w-measure text-lede text-ink-200 text-pretty">
                Our specialisations run from ERP through development to testing
                and delivery, with a working understanding of how those
                platforms are changing right now.
              </p>
              {showLink ? (
                <Link
                  href="/technology"
                  className="link-underline mt-9 inline-flex items-center gap-2 text-[0.9375rem] font-semibold"
                >
                  Technology expertise in detail
                  <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
              ) : null}
            </Reveal>
          </div>

          <div className="lg:col-span-5 lg:col-start-8">
            <RevealMask>
              <Figure
                image={images.hardware}
                className="aspect-[3/2] w-full"
                imageClassName="opacity-80"
                sizes="(min-width: 1024px) 38vw, 100vw"
                decorative
              />
            </RevealMask>
          </div>
        </div>

        <ul className="mt-16 grid gap-px bg-white/10 lg:mt-24 lg:grid-cols-5">
          {technologyAreas.map((area, index) => (
            <RevealItem
              key={area.id}
              delay={Math.min(index, 4) * 0.05}
              className="bg-ink-900 p-7 transition-colors duration-500 ease-editorial hover:bg-ink-800 lg:p-8"
            >
              <h3 className="text-[1.125rem] font-semibold leading-snug">
                {area.name}
              </h3>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-300">
                {area.description}
              </p>
              <ul className="mt-6 space-y-2 text-meta text-ink-200">
                {area.capabilities.map((capability) => (
                  <li key={capability} className="flex gap-2.5">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1 shrink-0 rounded-full bg-cobalt-bright"
                    />
                    {capability}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
