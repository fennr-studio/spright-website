"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav } from "@/data/navigation";
import { primaryOffice } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Site header.
 *
 * Measured off the reference: a 96px bar sitting in normal flow rather than
 * fixed, logo left, links inline, and a phone number beside a small solid CTA
 * on the right. The active link carries an underline and a corner arrow.
 *
 * It does not stick. The reference's navbar is `position: relative` and the
 * page is designed around the header scrolling away, so pinning it here would
 * change the composition of every section below.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  const [menuOpen, setMenuOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setMenuOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  // Lock background scroll while the sheet is open.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Escape closes the sheet from anywhere.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, closeMenu]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="relative z-50 bg-paper">
      <div className="gutter flex h-[76px] items-center justify-between gap-8 lg:h-[96px]">
        <Link href="/" aria-label={`${"Spright"} — home`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          <NavLink href="/" active={isActive("/")}>
            Home
          </NavLink>

          {mainNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setOpenGroup(item.href)}
                onMouseLeave={() => setOpenGroup(null)}
              >
                <button
                  type="button"
                  className={cn(
                    "inline-flex items-center gap-1.5 text-body transition-colors duration-300",
                    isActive(item.href) ? "text-ink" : "text-ink-500 hover:text-ink",
                  )}
                  aria-expanded={openGroup === item.href}
                  onClick={() =>
                    setOpenGroup(openGroup === item.href ? null : item.href)
                  }
                >
                  {item.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-300",
                      openGroup === item.href && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>

                <AnimatePresence>
                  {openGroup === item.href && (
                    <motion.div
                      initial={reduced ? false : { opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduced ? undefined : { opacity: 0, y: 6 }}
                      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute left-0 top-full w-[19rem] pt-4"
                    >
                      <div className="rounded-card border border-mist-line bg-paper p-2 shadow-[0_18px_50px_-24px_rgba(18,21,18,0.28)]">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-thumb px-4 py-3 transition-colors duration-200 hover:bg-mist"
                          >
                            <span className="block text-body text-ink">
                              {child.label}
                            </span>
                            {child.summary && (
                              <span className="mt-0.5 block text-meta text-ink-400">
                                {child.summary}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={item.href} href={item.href} active={isActive(item.href)}>
                {item.label}
              </NavLink>
            ),
          )}
        </nav>

        <div className="flex items-center gap-5">
          <a
            href={primaryOffice.phoneHref}
            className="hidden text-body text-ink transition-colors duration-300 hover:text-cobalt xl:block"
          >
            {primaryOffice.phoneLabel}
          </a>

          <ButtonLink href="/contact" size="sm" className="hidden sm:inline-flex">
            Get in Touch
          </ButtonLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="-mr-1 p-2 text-ink lg:hidden"
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav"
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-[76px] z-50 overflow-y-auto bg-paper px-5 pb-16 pt-4 lg:hidden"
          >
            <nav aria-label="Primary, mobile" className="flex flex-col">
              <MobileLink href="/">Home</MobileLink>
              {mainNav.map((item) => (
                <div key={item.href}>
                  <MobileLink href={item.href}>{item.label}</MobileLink>
                  {item.children && (
                    <div className="mb-2 flex flex-col gap-1 pb-4 pl-4">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="py-2 text-body text-ink-500"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <MobileLink href="/contact">Contact</MobileLink>
            </nav>

            <div className="mt-8 flex flex-col gap-4">
              <ButtonLink href="/contact" className="w-full">
                Get in Touch
              </ButtonLink>
              <a
                href={primaryOffice.phoneHref}
                className="text-body text-ink-500"
              >
                {primaryOffice.phoneLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group/nav inline-flex items-center gap-0.5 text-body transition-colors duration-300",
        active ? "text-ink" : "text-ink-500 hover:text-ink",
      )}
      aria-current={active ? "page" : undefined}
    >
      <span className={cn(active && "underline decoration-1 underline-offset-[6px]")}>
        {children}
      </span>
      <ArrowUpRight
        className={cn(
          "h-3.5 w-3.5 transition-opacity duration-300",
          active ? "opacity-100" : "opacity-0 group-hover/nav:opacity-60",
        )}
        aria-hidden
      />
    </Link>
  );
}

function MobileLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="border-b border-mist-line py-5 text-display-sm text-ink"
    >
      {children}
    </Link>
  );
}
