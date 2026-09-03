import type { ReactNode } from "react";
import Link from "next/link";
import { Reveal } from "@/components/animations/Reveal";
import { Container } from "@/components/ui/Section";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

/**
 * Shared hero for every inner page.
 *
 * Light, like the reference's inner pages, and in normal flow — the header
 * is no longer fixed, so the old pt-[124px] offset that cleared it would now
 * read as a large unexplained gap. The breadcrumb doubles as the structural
 * marker, so no decorative eyebrow is needed above the title.
 */
export function PageHero({
  title,
  lede,
  crumbs,
  children,
  className,
}: {
  title: ReactNode;
  lede?: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative border-b border-mist-line bg-paper pb-14 pt-10 lg:pb-20 lg:pt-16",
        className,
      )}
    >
      <Container>
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-meta text-ink-400">
            {crumbs.map((crumb, index) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" className="text-ink-300">
                    /
                  </span>
                ) : null}
                {index === crumbs.length - 1 ? (
                  <span aria-current="page" className="text-ink">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.path} className="hover:text-ink">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>

        <div className="mt-10 grid gap-x-[100px] gap-y-8 lg:mt-14 lg:grid-cols-2">
          <Reveal>
            <h1 className="text-display-xl text-balance text-ink">{title}</h1>
          </Reveal>

          {lede ? (
            <Reveal delay={0.08}>
              <p className="max-w-measure text-lede text-pretty text-ink-500 lg:pt-3">
                {lede}
              </p>
            </Reveal>
          ) : null}
        </div>

        {children ? <div className="mt-12 lg:mt-16">{children}</div> : null}
      </Container>
    </section>
  );
}
