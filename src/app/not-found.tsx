import Link from "next/link";
import { Container } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { footerNav } from "@/data/navigation";

export default function NotFound() {
  return (
    <section className="on-ink bg-ink-900 pb-section pt-[160px] text-paper">
      <Container>
        <p className="tabular text-meta font-semibold text-cobalt-bright">404</p>
        <h1 className="mt-8 max-w-[16ch] text-display-xl font-medium text-balance">
          That page is not here.
        </h1>
        <p className="mt-8 max-w-measure text-lede text-ink-200">
          The link may be out of date, or the page may have moved during our
          recent rebuild. Everything below still works.
        </p>

        <div className="mt-12 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" variant="solidOnInk" size="lg">
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="ghostOnInk" size="lg">
            Get in touch
          </ButtonLink>
        </div>

        <nav aria-label="Site" className="mt-20 border-t border-white/10 pt-8">
          <ul className="flex flex-wrap gap-x-8 gap-y-3">
            {footerNav.explore.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="link-underline text-[0.9375rem] text-ink-200 hover:text-paper"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </section>
  );
}
