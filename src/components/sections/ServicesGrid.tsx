import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { services } from "@/data/services";
import { images } from "@/lib/images";

/** One photograph per service, chosen to match the subject rather than at random. */
const serviceImage = [images.collaboration, images.engineering, images.interview];

/**
 * Services.
 *
 * The reference presents its offering as a row of linked thumbnails under one
 * heading, with the section on the mist surface. Each item is a photograph, a
 * title and a single line — the detail lives on the service page, not here.
 */
export function ServicesGrid() {
  const primary = services.slice(0, 3);

  return (
    <Section tone="mist" aria-labelledby="services-heading">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Services</p>
            <h2
              id="services-heading"
              className="mt-5 text-display-lg text-balance text-ink"
            >
              Specialized hiring, built around the role.
            </h2>
          </div>

          <ButtonLink href="/services" variant="outline" className="self-start lg:self-auto">
            All services
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
              aria-hidden
            />
          </ButtonLink>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {primary.map((service, i) => {
            const asset = serviceImage[i % serviceImage.length]!;
            return (
              <Reveal key={service.slug} delay={i * 0.08}>
                <li>
                  <Link href={service.href} className="group block">
                    <div className="media aspect-[4/3]">
                      <Image
                        src={asset.src}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>

                    <div className="mt-6 flex items-start justify-between gap-4">
                      <h3 className="text-display-sm text-ink">{service.title}</h3>
                      <ArrowUpRight
                        className="mt-1 h-5 w-5 shrink-0 text-ink-300 transition-all duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        aria-hidden
                      />
                    </div>

                    <p className="mt-3 text-body text-ink-500">{service.summary}</p>
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
