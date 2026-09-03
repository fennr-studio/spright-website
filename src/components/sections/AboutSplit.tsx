import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/lib/images";

/**
 * About.
 *
 * The reference's about block: eyebrow, a two-line statement, a controlled
 * paragraph, a link out, and one large photograph at roughly 1.2:1 sitting
 * beside it. The measured ratio matters — a 16:9 here reads as a banner
 * rather than as a portrait of the company.
 */
export function AboutSplit() {
  return (
    <Section tone="paper" aria-labelledby="about-heading">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-[100px]">
          <div>
            <p className="eyebrow">About Spright</p>

            <Reveal>
              <h2
                id="about-heading"
                className="mt-5 text-display-lg text-balance text-ink"
              >
                Driven by expertise. Focused on better outcomes.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 max-w-measure text-lede text-ink-500">
                Spright Software Systems is a specialized hiring partner for
                organizations that need technical depth rather than volume. Our
                sector coverage rests on fifteen years of resource experience
                across human resources, IT and functional industries — which
                shows up as sharper shortlists and fewer wasted interviews.
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <p className="mt-5 max-w-measure text-body text-ink-500">
                We work from two bases, in Pune and Tampa, supporting hiring
                across ten-plus countries and time zones.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10">
                <ButtonLink href="/about">
                  More about us
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden
                  />
                </ButtonLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="media aspect-[6/5]">
              <Image
                src={images.introSplit.src}
                alt={images.introSplit.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
