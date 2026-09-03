import type { Metadata } from "next";
import { Mail, Phone } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import { ContactForm } from "@/components/forms/ContactForm";
import { JsonLd } from "@/components/ui/JsonLd";
import { breadcrumbSchema } from "@/lib/structured-data";
import { pageMetadata } from "@/lib/seo";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Talk to Spright Software Systems about specialised hiring. Offices in Pune, India and Tampa, Florida. Email hr@sprightsoft.com.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />

      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
        title="Let's talk about what your team needs next."
        lede="One role or a whole delivery team — tell us the shape of it and we will come back within one working day."
      />

      <Section aria-labelledby="contact-form-heading">
        <Container>
          <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <h2 id="contact-form-heading" className="sr-only">
                Contact form
              </h2>
              <ContactForm />
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="border-t border-mist-line pt-7">
                <h2 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                  Direct lines
                </h2>
                <ul className="mt-6 space-y-4">
                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="inline-flex items-center gap-3 text-[0.9375rem] font-medium transition-colors hover:text-cobalt"
                    >
                      <Mail aria-hidden="true" className="size-4 text-cobalt" />
                      {site.email}
                    </a>
                  </li>
                  {offices.map((office) => (
                    <li key={office.id}>
                      <a
                        href={office.phoneHref}
                        className="inline-flex items-center gap-3 text-[0.9375rem] font-medium transition-colors hover:text-cobalt"
                      >
                        <Phone aria-hidden="true" className="size-4 text-cobalt" />
                        {office.phoneLabel}
                        <span className="text-meta font-normal text-ink-400">
                          {office.country}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
                {offices.map((office) => (
                  <div key={office.id} className="border-t border-mist-line pt-7">
                    <h3 className="text-[1.25rem] font-semibold tracking-[-0.02em]">
                      {office.country}
                    </h3>
                    <address className="mt-4 not-italic text-[0.9375rem] leading-relaxed text-ink-500">
                      {office.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="block">
                        {office.city} — {office.postalCode}
                      </span>
                      <span className="block">{office.region}</span>
                    </address>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
