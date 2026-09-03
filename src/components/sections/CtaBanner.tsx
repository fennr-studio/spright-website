import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/animations/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { images } from "@/lib/images";
import { site, offices } from "@/lib/site";

/**
 * Closing call to action.
 *
 * The reference finishes on a large statement over a photograph with a single
 * button and the contact details sitting quietly underneath. Scale does the
 * work; there is no gradient and no glow.
 */
export function CtaBanner({
  heading,
  body,
  cta,
}: {
  /** Overrides the closing statement on inner pages. */
  heading?: string;
  /** Overrides the supporting paragraph. */
  body?: string;
  /** Overrides the primary button label. */
  cta?: string;
} = {}) {
  return (
    <Section tone="paper" aria-labelledby="cta-heading">
      <Container>
        <div className="relative overflow-hidden rounded-card bg-ink">
          <Image
            src={images.globalNetwork.src}
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20"
          />

          <div className="relative px-6 py-20 sm:px-12 lg:px-20 lg:py-28">
            <Reveal>
              <h2
                id="cta-heading"
                className="max-w-[18ch] text-display-lg text-balance text-white"
              >
                {heading ?? "Let\u2019s build something that moves your business forward."}
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="mt-7 max-w-measure text-lede text-white/70">
                {body ??
                  "Tell us the role, the technical environment and the timeline. We will come back with people, not a database dump."}
              </p>
            </Reveal>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <ButtonLink href="/contact" variant="solidOnInk">
                  {cta ?? "Talk to our experts"}
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform duration-300 ease-editorial group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden
                  />
                </ButtonLink>
                <ButtonLink href="/careers" variant="ghostOnInk">
                  Join our talent network
                </ButtonLink>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-8 border-t border-white/12 pt-8 sm:grid-cols-3">
              <div>
                <p className="text-meta text-white/45">Email</p>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline mt-2 block text-body text-white"
                >
                  {site.email}
                </a>
              </div>

              {offices.map((office) => (
                <div key={office.id}>
                  <p className="text-meta text-white/45">{office.country}</p>
                  <a
                    href={office.phoneHref}
                    className="link-underline mt-2 block text-body text-white"
                  >
                    {office.phoneLabel}
                  </a>
                  <p className="mt-1 text-meta text-white/50">
                    {office.city}, {office.region}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
