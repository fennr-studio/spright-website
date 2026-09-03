import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section, Container } from "@/components/ui/Section";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { images } from "@/lib/images";

/** The argument for the whole company, made once, in large type. */
export function IntroSplit() {
  return (
    <Section aria-labelledby="intro-heading">
      <Container>
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3 text-meta font-medium text-ink-400">
                <span aria-hidden="true" className="h-px w-8 bg-cobalt" />
                Our approach
              </p>
              <h2
                id="intro-heading"
                className="mt-8 text-display-lg font-medium text-balance"
              >
                The right people change what a business is able to attempt.
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 max-w-measure space-y-6 text-body text-ink-500">
                <p>
                  People are the most strategic component of business success,
                  and the most variable. We work on that variable directly:
                  finding professionals with the skills, competencies and
                  attitude a role genuinely needs, then getting them into it
                  quickly.
                </p>
                <p>
                  We are an unconventional technical staffing partner. The
                  engagement is shaped around your requirement rather than our
                  template — short-term and seasonal cover, contract-to-hire for
                  project-based support with a route to permanent employment, or
                  a direct search for the specialist you need on the team today.
                </p>
              </div>

              <Link
                href="/about"
                className="link-underline mt-10 inline-flex items-center gap-2 text-[0.9375rem] font-semibold"
              >
                More about how we work
                <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <RevealMask>
              <Figure
                image={images.introSplit}
                className="aspect-[5/6] w-full"
                sizes="(min-width: 1024px) 38vw, 100vw"
              />
            </RevealMask>
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-measure-sm text-meta leading-relaxed text-ink-400">
                Project managers, technical architects, software engineers and
                solution specialists — people with real delivery years behind
                them.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
