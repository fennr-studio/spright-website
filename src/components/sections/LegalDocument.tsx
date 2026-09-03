import { PageHero } from "@/components/sections/PageHero";
import { Section, Container } from "@/components/ui/Section";
import type { LegalSection } from "@/data/legal";
import { lastUpdated } from "@/data/legal";

/** Shared renderer for the privacy policy and terms pages. */
export function LegalDocument({
  title,
  intro,
  sections,
  crumbLabel,
  crumbPath,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  crumbLabel: string;
  crumbPath: string;
}) {
  return (
    <>
      <PageHero
        crumbs={[
          { name: "Home", path: "/" },
          { name: crumbLabel, path: crumbPath },
        ]}
        title={title}
        lede={intro}
      />

      <Section>
        <Container>
          <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <p className="text-meta text-ink-400">
                Last updated {lastUpdated}
              </p>
              <nav aria-label="On this page" className="mt-8 hidden lg:block">
                <ul className="space-y-3">
                  {sections.map((section) => (
                    <li key={section.heading}>
                      <a
                        href={`#${slug(section.heading)}`}
                        className="link-underline text-meta text-ink-500 hover:text-ink"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-8 lg:col-start-5">
              {sections.map((section) => (
                <section
                  key={section.heading}
                  id={slug(section.heading)}
                  className="border-t border-mist-line py-9 first:border-t-0 first:pt-0"
                >
                  <h2 className="text-display-sm font-medium tracking-[-0.025em]">
                    {section.heading}
                  </h2>
                  <div className="mt-5 max-w-measure space-y-4 text-body text-ink-500">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
