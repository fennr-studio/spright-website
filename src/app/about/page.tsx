import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { StatsBand } from "@/components/sections/StatsBand";
import { WhySpright } from "@/components/sections/WhySpright";
import { IndustriesShowcase } from "@/components/sections/IndustriesShowcase";
import { GlobalPresence } from "@/components/sections/GlobalPresence";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Spright Software Systems builds partnerships that create value for clients — technology depth over marketing strength, and client success ahead of everything else.",
  path: "/about",
});

const principles = [
  {
    title: "Partnership before transaction",
    body: "We believe in a partner ecosystem that creates value through solutions built to make a difference — and that helps clients reach their own vision, goals and organisational objectives. Strategic partnerships are a core pillar of how the business is run, not a line in a deck.",
  },
  {
    title: "Depth over noise",
    body: "We value integrity and technical depth over marketing strength, and put client success above all else. That shows in who we partner with: 'best-in-class' organisations that share the same values and the same appetite for doing the work properly.",
  },
  {
    title: "Relationships that outlast the placement",
    body: "We are an organisation that thrives on building strong lasting relationships. The commitment is to above-and-beyond service that drives both client and partner success — long after a contract is signed.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
        title="A staffing partner built around technical depth."
        lede="Spright Software Systems helps organisations do business better by putting the right specialists into the right roles — reliably, at scale, and across two continents."
      />

      <Section aria-labelledby="story-heading">
        <Container>
          <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <SectionIntro
                marker="Our story"
                headingId="story-heading"
                heading="Solutions that create value, for clients and for the people we place."
              />
              <Reveal delay={0.08}>
                <div className="mt-10 max-w-measure space-y-6 text-body text-ink-500">
                  <p>
                    Spright Software Systems believes in a partner ecosystem
                    that creates value for clients through innovative solutions
                    focused on making a difference — and that assists those
                    clients in achieving their vision, their goals and their
                    organisational objectives.
                  </p>
                  <p>
                    We share a common set of cultural values with our alliance
                    partners and drive towards the same kind of business goals.
                    We value integrity and technology depth over marketing
                    strength, and we put customer success above all else. That is
                    reflected in our partnerships with leading technology
                    platform partners and clients, which we continue to nurture
                    and augment.
                  </p>
                  <p>
                    You can count on Spright to deliver reliable, scalable,
                    world-class services and solutions suited to your business
                    needs. As an organisation that thrives on building strong
                    lasting relationships, we are committed to service that goes
                    beyond the brief.
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <RevealMask>
                <Figure
                  image={images.workplace}
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                />
              </RevealMask>
            </div>
          </div>
        </Container>
      </Section>

      <StatsBand />

      <Section tone="mist" aria-labelledby="principles-heading">
        <Container>
          <SectionIntro
            marker="How we operate"
            headingId="principles-heading"
            align="split"
            heading="Three commitments we hold to on every engagement."
            lede="They are unremarkable stated plainly. They are also the reason clients come back for a second and third hire."
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 lg:mt-20 lg:grid-cols-3">
            {principles.map((principle, index) => (
              <Reveal
                key={principle.title}
                delay={index * 0.07}
                className="border-t border-mist-line pt-7"
              >
                <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                  {principle.title}
                </h3>
                <p className="mt-4 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="people-heading">
        <Container>
          <div className="grid items-center gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <RevealMask>
                <Figure
                  image={images.collaboration}
                  className="aspect-[16/10] w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </RevealMask>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <Reveal>
                <h2
                  id="people-heading"
                  className="text-display-md font-medium text-balance"
                >
                  The people behind the shortlist.
                </h2>
                <p className="mt-6 max-w-measure text-body text-ink-500">
                  Our team includes highly experienced project managers,
                  technical architects, software engineers and solution
                  specialists — people with many years of delivering with
                  leading-edge technologies. That is what makes a technical
                  conversation with us a technical conversation.
                </p>
                <p className="mt-5 max-w-measure text-body text-ink-500">
                  It also means we bring a human touch to the process. You meet
                  the consultant who will run your recruitment journey, not a
                  handover chain.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <IndustriesShowcase />
      <WhySpright />
      <GlobalPresence />
      <CtaBanner
        heading="Let's talk about what your team needs next."
        cta="Get in touch"
      />
    </>
  );
}
