import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { technologyAreas } from "@/data/technology";
import { images } from "@/lib/images";

/**
 * Featured expertise.
 *
 * The reference gives this slot to case studies: one wide hero item at 2.4:1
 * followed by a row of narrower ones. Spright publishes no client work, and
 * fabricating case studies on a recruitment site would misrepresent the
 * business — so the layout is kept and filled with capability areas, which
 * are verifiable.
 */
export function FeaturedExpertise() {
  const [lead, ...rest] = technologyAreas;
  if (!lead) return null;

  return (
    <Section tone="paper" aria-labelledby="expertise-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Featured expertise</p>
            <h2
              id="expertise-heading"
              className="mt-5 text-display-lg text-balance text-ink"
            >
              Where our technical depth sits.
            </h2>
          </div>
        </div>

        {/* Lead item — the reference's 2.4:1 hero */}
        <Reveal>
          <Link href="/technology" className="group mt-14 block">
            <div className="media aspect-[2.4/1]">
              <Image
                src={images.engineering.src}
                alt=""
                fill
                sizes="100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-7 grid gap-6 lg:grid-cols-[minmax(0,594fr)_minmax(0,742fr)] lg:gap-[100px]">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-display-md text-ink">{lead.name}</h3>
                <ArrowUpRight
                  className="mt-2 h-5 w-5 shrink-0 text-ink-300 transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                  aria-hidden
                />
              </div>
              <div>
                <p className="max-w-measure text-lede text-ink-500">
                  {lead.description}
                </p>
                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                  {lead.capabilities.slice(0, 4).map((c) => (
                    <li key={c} className="text-meta text-ink-400">
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Link>
        </Reveal>

        {/* Remaining areas */}
        <ul className="mt-16 grid gap-x-8 gap-y-12 md:grid-cols-2">
          {rest.slice(0, 4).map((area, i) => (
            <Reveal key={area.id} delay={i * 0.06}>
              <li className="border-t border-mist-line pt-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-display-sm text-ink">{area.name}</h3>
                  <span className="tabular text-meta text-ink-300">
                    {String(i + 2).padStart(2, "0")}
                  </span>
                </div>
                <p className="mt-3 max-w-measure text-body text-ink-500">
                  {area.description}
                </p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
