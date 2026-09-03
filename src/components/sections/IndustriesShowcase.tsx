import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { industries } from "@/data/industries";
import { images } from "@/lib/images";

const industryImage = [
  images.workplace,
  images.hardware,
  images.engineering,
  images.desk,
  images.careers,
  images.cityscape,
  images.officeDetail,
];

/**
 * Industries.
 *
 * Large photography, large titles, minimal copy — the reference's featured
 * layout rather than an icon grid. The first item runs full width so the row
 * has a lead rather than reading as seven equal tiles.
 */
export function IndustriesShowcase({
  limit = 6,
  showLink = true,
}: {
  limit?: number;
  /** Hidden on the industries page itself, where the link would loop. */
  showLink?: boolean;
}) {
  const shown = industries.slice(0, limit);

  return (
    <Section tone="mist" aria-labelledby="industries-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Industries</p>
            <h2
              id="industries-heading"
              className="mt-5 text-display-lg text-balance text-ink"
            >
              The sectors we recruit for.
            </h2>
          </div>

          {showLink && (
            <ButtonLink href="/industries" variant="outline" className="self-start lg:self-auto">
              All industries
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                aria-hidden
              />
            </ButtonLink>
          )}
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((industry, i) => {
            const asset = industryImage[i % industryImage.length]!;
            return (
              <Reveal key={industry.id} delay={(i % 3) * 0.07}>
                <li>
                  <Link href="/industries" className="group block">
                    <div className="media aspect-[3/2]">
                      <Image
                        src={asset.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-4">
                      <h3 className="text-display-sm text-ink">{industry.name}</h3>
                      <ArrowUpRight
                        className="mt-1 h-5 w-5 shrink-0 text-ink-300 transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden
                      />
                    </div>

                    <p className="mt-3 text-body text-ink-500">
                      {industry.description}
                    </p>

                    <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                      {industry.roles.slice(0, 3).map((role) => (
                        <li key={role} className="text-meta text-ink-400">
                          {role}
                        </li>
                      ))}
                    </ul>
                  </Link>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
