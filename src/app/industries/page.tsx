import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { IndustriesShowcase } from "@/components/sections/IndustriesShowcase";
import { RecruitmentWorkflow } from "@/components/sections/RecruitmentWorkflow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = pageMetadata({
  title: "Industries",
  description:
    "Hiring across information technology, manufacturing and design, chemical engineering, media and communication, education, corporate roles and human resources.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Industries", path: "/industries" },
        ]}
        title="Seven domains. Fifteen years of resource experience behind them."
        lede="We cater to a wide range of IT and functional industries, providing insight into the technology each one runs on with first-hand experience resources."
      />

      <Section aria-labelledby="sector-heading">
        <Container>
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <SectionIntro
                marker="Sector coverage"
                headingId="sector-heading"
                heading="Understanding the market a role sits in."
              />
              <Reveal delay={0.08}>
                <div className="mt-10 max-w-measure space-y-6 text-body text-ink-500">
                  <p>
                    Sector expertise is not a badge. It is knowing what a
                    requirement in manufacturing means for the person
                    specification, why a chemical engineering brief has
                    constraints an IT brief does not, and where in the market
                    those people actually are.
                  </p>
                  <p>
                    We demonstrate that understanding on the brief, before the
                    search starts — so the profile you approve is the profile
                    the market will recognise.
                  </p>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-5 lg:col-start-8">
              <RevealMask>
                <Figure
                  image={images.officeDetail}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </RevealMask>
            </div>
          </div>
        </Container>
      </Section>

      <IndustriesShowcase showLink={false} />
      <RecruitmentWorkflow />
      <CtaBanner
        heading="Hiring in one of these sectors?"
        body="Tell us the domain and the role. We will tell you what the market looks like for it right now."
        cta="Start a conversation"
      />
    </>
  );
}
