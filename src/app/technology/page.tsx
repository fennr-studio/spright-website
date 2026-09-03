import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/animations/Reveal";
import { TechnologyExpertise } from "@/components/sections/TechnologyExpertise";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { technologyAreas } from "@/data/technology";

export const metadata: Metadata = pageMetadata({
  title: "Technology",
  description:
    "Where Spright's technical depth sits: enterprise technology and ERP, software engineering, quality engineering, product delivery and current technology ecosystems.",
  path: "/technology",
});

export default function TechnologyPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Technology", path: "/technology" },
        ]}
        title="Technology that moves business forward."
        lede="From ERP through development to testing and delivery — and the platforms all of it is moving onto next."
      />

      <TechnologyExpertise showLink={false} />

      <Section aria-labelledby="roles-heading">
        <Container>
          <SectionIntro
            marker="Roles we fill"
            headingId="roles-heading"
            align="split"
            heading="A working index of what we recruit for."
            lede="Not exhaustive — but if a role sits close to one of these, we can almost certainly help."
          />

          <div className="mt-16 lg:mt-20">
            {technologyAreas.map((area, index) => (
              <Reveal key={area.id} delay={Math.min(index, 3) * 0.05}>
                <div className="grid gap-y-4 border-t border-mist-line py-8 md:grid-cols-12 md:gap-x-10 lg:py-10">
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em] md:col-span-4">
                    {area.name}
                  </h3>
                  <ul className="flex flex-wrap gap-x-2.5 gap-y-2 md:col-span-8">
                    {area.capabilities.map((capability) => (
                      <li
                        key={capability}
                        className="rounded-pill border border-mist-line px-4 py-2 text-meta text-ink-500"
                      >
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
            <div className="rule" />
          </div>
        </Container>
      </Section>

      <ProcessTimeline />
      <CtaBanner
        heading="Looking for one of these specialists?"
        body="Send the requirement over. We will come back with availability, market rates and a realistic timeline."
        cta="Talk to our experts"
      />
    </>
  );
}
