"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";
import { IconArrowRight, IconClose, IconMark, IconMenu } from "@/components/icons";

const navLinks = [
  { href: "/services", label: "Services & Pricing" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/membership", label: "Membership" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500 ${
          scrolled
            ? "border-b border-white/10 bg-void/85 backdrop-blur-md"
            : "border-b border-transparent bg-gradient-to-b from-void/70 via-void/20 to-transparent"
        }`}
      >
        <Container className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 text-ink">
            {/* -0.4px measured against the wordmark's actual glyph bounds
                at this render size — optical, not bounding-box, centering. */}
            <IconMark
              size={22}
              className="text-accent-green"
              style={{ transform: "translateY(-0.4px)" }}
            />
            <span className="text-sm font-semibold tracking-[0.22em] uppercase">
              {siteConfig.businessName}
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`link-underline py-1 text-sm transition-colors duration-300 hover:text-ink ${
                    active ? "text-ink" : "text-ink-muted"
                  }`}
                  style={
                    active
                      ? ({
                          "--link-underline-color": "var(--color-accent-green)",
                          backgroundSize: "100% 1px",
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-6 lg:flex">
            <a
              href={siteConfig.phoneHref}
              className="link-underline text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
            >
              {siteConfig.phoneDisplay}
            </a>
            <Link href="/book" className="btn btn-primary-on-dark">
              Request a Repair
            </Link>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </Container>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-void transition-opacity duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <Container className="flex h-20 items-center justify-end">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center text-ink"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <IconClose size={22} />
          </button>
        </Container>
        <Container className="flex flex-1 flex-col justify-center gap-1 pb-20">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`border-t border-white/10 py-4 font-display text-3xl text-ink transition-transform duration-500 ${
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
              style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-8">
            <a href={siteConfig.phoneHref} className="text-ink-muted">
              {siteConfig.phoneDisplay}
            </a>
            <Link
              href="/book"
              className="btn btn-primary-on-dark w-fit"
              onClick={() => setOpen(false)}
            >
              Request a Repair
              <IconArrowRight size={16} />
            </Link>
          </div>
        </Container>
      </div>
    </>
  );
}
