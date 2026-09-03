import { ArrowRight } from "lucide-react";
import { Section, Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { images } from "@/lib/images";

export function CareersTeaser() {
  return (
    <Section aria-labelledby="careers-heading">
      <Container>
        <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <RevealMask>
              <Figure
                image={images.careers}
                className="aspect-[3/2] w-full"
                sizes="(min-width: 1024px) 40vw, 100vw"
              />
            </RevealMask>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="flex items-center gap-3 text-meta font-medium text-ink-400">
                <span aria-hidden="true" className="h-px w-8 bg-cobalt" />
                Careers
              </p>
              <h2
                id="careers-heading"
                className="mt-8 text-display-md font-medium text-balance"
              >
                Looking for your next role, not just your next job?
              </h2>
              <p className="mt-6 max-w-measure text-body text-ink-500">
                We place specialists into contract, contract-to-hire and
                permanent positions across technology and functional teams. Tell
                us what you do and where you want to do it, and we will come
                back when there is something worth your time.
              </p>
              <ButtonLink href="/careers" size="lg" className="mt-9">
                Explore careers
                <ArrowRight aria-hidden="true" className="size-4" />
              </ButtonLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
