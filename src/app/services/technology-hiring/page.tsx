import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { TechnologyExpertise } from "@/components/sections/TechnologyExpertise";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { HiringModels } from "@/components/sections/HiringModels";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = pageMetadata({
  title: "Technology hiring",
  description:
    "Technology hiring across ERP, software development, testing and delivery — with first-hand understanding of the platforms your roles actually depend on.",
  path: "/services/technology-hiring",
});

const differences = [
  {
    title: "A brief read, not keyword-matched",
    body: "The difference between a Java developer and the Java developer your platform needs is in the detail of the brief. We read it.",
  },
  {
    title: "Assessment by people who have delivered",
    body: "Technical screening is run by architects and engineers with delivery years behind them, so a shortlist reflects capability rather than CV vocabulary.",
  },
  {
    title: "Current, not historical",
    body: "We track how the platforms in our specialisations are updating. Shortlists reflect the stack you are moving to, not the one you are leaving behind.",
  },
];

export default function TechnologyHiringPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Technology hiring", path: "/services/technology-hiring" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Technology hiring", path: "/services/technology-hiring" },
        ]}
        title="Hiring for technology, by people who understand it."
        lede="Our specialisations run from ERP through development to testing and delivery — with a working understanding of what is changing across those platforms right now."
      />

      <Section aria-labelledby="th-overview">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <RevealMask>
                <Figure
                  image={images.engineering}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </RevealMask>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <SectionIntro
                marker="Overview"
                headingId="th-overview"
                heading="Depth across a wide range of IT technologies."
              />
              <Reveal delay={0.08}>
                <div className="mt-10 max-w-measure space-y-6 text-body text-ink-500">
                  <p>
                    Our specialisations cater to a wide range of IT
                    technologies, from ERP to development to testing and
                    delivery. Behind that is a deep understanding of the
                    technical updating happening across platforms in today&rsquo;s IT
                    industry.
                  </p>
                  <p>
                    We provide insight into the technology a role depends on
                    with first-hand experience of it. That is what separates a
                    shortlist you can interview from a list you have to filter.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist" spacing="compact" aria-labelledby="th-difference">
        <Container>
          <SectionIntro
            marker="What is different"
            headingId="th-difference"
            heading="Three things technical clients notice first."
          />
          <div className="mt-14 grid gap-x-12 gap-y-12 lg:grid-cols-3">
            {differences.map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 0.06}
                className="border-t border-mist-line pt-7"
              >
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <TechnologyExpertise showLink={false} />
      <HiringModels />
      <ProcessTimeline />
      <CtaBanner
        heading="Send us a technical brief."
        body="We will tell you where the talent is, what it costs, and how long it will realistically take to get it into your team."
        cta="Talk to our experts"
      />
    </>
  );
}
