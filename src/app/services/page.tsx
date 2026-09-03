import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/animations/Reveal";
import { HiringModels } from "@/components/sections/HiringModels";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TechnologyExpertise } from "@/components/sections/TechnologyExpertise";
import { RecruitmentWorkflow } from "@/components/sections/RecruitmentWorkflow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { offerings, services } from "@/data/services";
import { pad } from "@/lib/utils";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Consulting placements, full-time hiring, temporary-to-permanent and freelance support — plus specialised technology hiring across ERP, development, testing and delivery.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
        title="Hiring built around the requirement, not the template."
        lede="Whether you need one specialist for six weeks or a permanent team for the next five years, the engagement is shaped around the work in front of you."
      />

      <Section aria-labelledby="offer-heading">
        <Container>
          <SectionIntro
            marker="Core services"
            headingId="offer-heading"
            align="split"
            heading="Two practices, one process behind them."
            lede="Staffing and technology hiring share the same screening, the same administration and the same team. What changes is the depth of technical assessment a role calls for."
          />

          <ul className="mt-16 grid gap-px bg-mist-deep/70 lg:mt-20 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <li key={service.slug}>
                  <Reveal delay={index * 0.06}>
                    <Link
                      href={service.href}
                      className="group flex h-full flex-col bg-paper p-8 transition-colors duration-500 ease-editorial hover:bg-mist lg:p-10"
                    >
                      <div className="flex items-center justify-between">
                        <Icon aria-hidden="true" className="size-6 text-cobalt" />
                        <span className="tabular text-meta font-semibold text-ink-400">
                          {pad(index + 1)}
                        </span>
                      </div>
                      <h3 className="mt-8 text-display-sm font-medium tracking-[-0.025em]">
                        {service.title}
                      </h3>
                      <p className="mt-4 text-[0.9375rem] leading-relaxed text-ink-500">
                        {service.description}
                      </p>
                      <ul className="mt-7 space-y-2.5 text-meta text-ink-400">
                        {service.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-2.5">
                            <span
                              aria-hidden="true"
                              className="mt-1.5 h-px w-3 shrink-0 bg-cobalt"
                            />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                      <span className="mt-auto flex items-center gap-2 pt-9 text-[0.9375rem] font-semibold">
                        <span className="link-underline">Read more</span>
                        <ArrowUpRight
                          aria-hidden="true"
                          className="size-4 transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:-translate-y-1"
                        />
                      </span>
                    </Link>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="offerings-heading">
        <Container>
          <SectionIntro
            marker="Engagement types"
            headingId="offerings-heading"
            heading="Four ways to bring people in."
            lede="Each of these is a live offering today, with the administration handled on our side."
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-2">
            {offerings.map((offering, index) => (
              <Reveal
                key={offering.title}
                delay={Math.min(index, 2) * 0.06}
                className="border-t border-mist-line pt-7"
              >
                <h3 className="text-display-sm font-medium tracking-[-0.025em]">
                  {offering.title}
                </h3>
                <p className="mt-4 max-w-measure text-body text-ink-500">
                  {offering.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <HiringModels />
      <ProcessTimeline />
      <RecruitmentWorkflow />
      <TechnologyExpertise />
      <CtaBanner />
    </>
  );
}
