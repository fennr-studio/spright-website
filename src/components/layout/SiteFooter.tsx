import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { footerNav } from "@/data/navigation";
import { site, offices } from "@/lib/site";

/**
 * Footer.
 *
 * The reference closes on a large, spacious block: identity and contact on
 * the left, three link columns to the right, then a hairline and a quiet
 * bottom row. Everything here is real Spright information — two offices, one
 * address each, the published email and phone numbers.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-mist-line bg-paper">
      <div className="gutter py-section-sm">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,2fr)] lg:gap-20">
          {/* Identity */}
          <div>
            <Logo />

            <p className="mt-6 max-w-measure-sm text-body text-ink-500">
              {site.tagline}.
            </p>

            <div className="mt-8">
              <p className="text-meta text-ink-400">Say hello</p>
              <a
                href={`mailto:${site.email}`}
                className="link-underline mt-2 inline-block text-display-sm text-ink"
              >
                {site.email}
              </a>
            </div>
          </div>

          {/* Columns */}
          <div className="grid gap-10 sm:grid-cols-3">
            <FooterColumn title="Company" links={footerNav.explore} />
            <FooterColumn title="Services" links={footerNav.services} />

            <div>
              <h3 className="text-meta font-medium text-ink">Locations</h3>
              <ul className="mt-5 space-y-6">
                {offices.map((office) => (
                  <li key={office.id}>
                    <p className="text-body text-ink">{office.country}</p>
                    <address className="mt-1.5 not-italic text-meta leading-relaxed text-ink-500">
                      {office.addressLines.map((line) => (
                        <span key={line} className="block">
                          {line}
                        </span>
                      ))}
                      <span className="block">
                        {office.city}
                        {office.region ? `, ${office.region}` : ""}{" "}
                        {office.postalCode}
                      </span>
                    </address>
                    <a
                      href={office.phoneHref}
                      className="link-underline mt-2 inline-block text-meta text-ink"
                    >
                      {office.phoneLabel}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="rule mt-16" />

        <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-meta text-ink-400">
            © {year} {site.name}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-6">
            {footerNav.company.slice(1).map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-meta text-ink-400 hover:text-ink"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-1.5 text-meta text-ink"
              >
                Get in touch
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform duration-300 ease-editorial group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-meta font-medium text-ink">{title}</h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="link-underline text-body text-ink-500 hover:text-ink"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
