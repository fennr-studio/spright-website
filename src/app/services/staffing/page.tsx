import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { HiringModels } from "@/components/sections/HiringModels";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { RecruitmentWorkflow } from "@/components/sections/RecruitmentWorkflow";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = pageMetadata({
  title: "Staffing",
  description:
    "Technical staffing from Spright Software Systems: short-term, seasonal and temporary cover, contract and project-based support, contract-to-hire, and permanent search.",
  path: "/services/staffing",
});

const benefits = [
  {
    title: "Screened before you see them",
    body: "Every candidate is screened and interviewed by us first. You spend your interview time on people who could actually do the job.",
  },
  {
    title: "Administration handled",
    body: "For contract placements we hold the contracts and carry the hassle — payroll, time tracking, taxes, worker's insurance and compensation.",
  },
  {
    title: "Skills, competencies and attitude",
    body: "We assess against all three. Technical capability that does not fit the team is a placement that does not last.",
  },
  {
    title: "Cost that reflects the role",
    body: "We work to your financial position and to the urgency of the position, rather than pushing every requirement towards the same fee.",
  },
];

export default function StaffingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Staffing", path: "/services/staffing" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Staffing", path: "/services/staffing" },
        ]}
        title="The most strategic variable in your business is who is in the room."
        lede="We help you optimise it — with specialists placed on the contract that fits the work, from a single seasonal hire to a full project team."
      />

      <Section aria-labelledby="overview-heading">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionIntro
                marker="Overview"
                headingId="overview-heading"
                heading="An unconventional technical staffing partner."
              />
              <Reveal delay={0.08}>
                <div className="mt-10 max-w-measure space-y-6 text-body text-ink-500">
                  <p>
                    We enable you to achieve and optimise the most strategic and
                    most variable component of business success: the right
                    people, with the proper skills, competencies and attitudes.
                  </p>
                  <p>
                    Our partnership model focuses on your unique needs. That
                    covers short-term, seasonal or temporary staffing
                    requirements; contract-to-hire talent for project-based
                    support, with the option to take the contractors on
                    permanently; and permanent search for the top talent your
                    company needs today.
                  </p>
                  <p>
                    In practice it means we can source recruits to suit any
                    length of contract — and that the recommendation you get
                    from us is the model that actually fits, not the one with
                    the largest fee attached.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <RevealMask>
                <Figure
                  image={images.interview}
                  className="aspect-[4/3] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </RevealMask>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="mist" aria-labelledby="benefits-heading">
        <Container>
          <SectionIntro
            marker="Key benefits"
            headingId="benefits-heading"
            heading="What changes when we run the hire."
          />
          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:mt-20">
            {benefits.map((benefit, index) => (
              <Reveal
                key={benefit.title}
                delay={Math.min(index, 2) * 0.06}
                className="border-t border-mist-line pt-7"
              >
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                  {benefit.title}
                </h3>
                <p className="mt-4 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500">
                  {benefit.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <HiringModels />
      <ProcessTimeline />
      <RecruitmentWorkflow />
      <CtaBanner
        heading="Tell us about the role you cannot fill."
        body="Send us the brief — or the rough shape of it — and we will come back with the hiring model, the timeline and the realistic version of what is possible."
        cta="Start a conversation"
      />
    </>
  );
}
