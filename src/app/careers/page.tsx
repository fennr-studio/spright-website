import type { Metadata } from "next";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { Figure } from "@/components/ui/Figure";
import { Reveal, RevealMask } from "@/components/animations/Reveal";
import { CareerForm } from "@/components/forms/CareerForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Careers",
  description:
    "Join the Spright talent network. Contract, contract-to-hire and permanent roles across ERP, software engineering, quality engineering, delivery and corporate functions.",
  path: "/careers",
});

const reasons = [
  {
    title: "Roles that match, not roles that fill a quota",
    body: "We come to you when something genuinely fits your expertise and the direction you want to go — and stay quiet otherwise.",
  },
  {
    title: "A real conversation about the work",
    body: "You speak to people who understand the technical brief, so you know what you are walking into before you interview.",
  },
  {
    title: "The contract you want",
    body: "Permanent, contract, contract-to-hire or freelance. We place across all of them, and we will tell you which is realistic for your profile.",
  },
];

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Careers", path: "/careers" },
        ]}
        title="Tell us what you do. We will tell you where it is needed."
        lede="We do not have a public vacancy board yet. What we have is a network of clients hiring specialists — and this form is the front door to it."
      />

      <Section aria-labelledby="why-join-heading">
        <Container>
          <div className="grid items-start gap-x-16 gap-y-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionIntro
                marker="Why join the network"
                headingId="why-join-heading"
                heading="Fewer emails. Better roles."
              />
              <div className="mt-12 space-y-9">
                {reasons.map((reason, index) => (
                  <Reveal
                    key={reason.title}
                    delay={index * 0.06}
                    className="border-t border-mist-line pt-6"
                  >
                    <h3 className="text-[1.125rem] font-semibold tracking-[-0.02em]">
                      {reason.title}
                    </h3>
                    <p className="mt-3 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500">
                      {reason.body}
                    </p>
                  </Reveal>
                ))}
              </div>

              <div className="mt-12">
                <RevealMask>
                  <Figure
                    image={images.desk}
                    className="aspect-[3/2] w-full"
                    sizes="(min-width: 1024px) 36vw, 100vw"
                  />
                </RevealMask>
              </div>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              {/*
                Job-listing hook: when a vacancy source exists, render the list
                above this block and keep the form as the fallback for
                speculative applications. Nothing else on the page changes.
              */}
              <div className="rounded-card border border-mist-line bg-mist p-8 lg:p-12">
                <h2 className="text-display-sm font-medium tracking-[-0.025em]">
                  Join the talent network
                </h2>
                <p className="mt-4 max-w-measure text-[0.9375rem] leading-relaxed text-ink-500">
                  Takes about two minutes. Everything except the résumé, phone
                  and location is optional detail that helps us match you
                  faster.
                </p>
                <div className="mt-10">
                  <CareerForm />
                </div>
              </div>

              <p className="mt-6 text-meta text-ink-400">
                Prefer email? Send your résumé to{" "}
                <a href={`mailto:${site.email}`} className="link-underline font-medium">
                  {site.email}
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
