import Link from "next/link";
import { Container } from "@/components/container";
import { siteConfig } from "@/lib/site-config";
import { IconMark } from "@/components/icons";

const columns = [
  {
    title: "Book",
    links: [
      { href: "/book", label: "Request a Repair" },
      { href: "/services", label: "Services & Pricing" },
      { href: "/how-it-works", label: "How It Works" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/membership", label: "Membership" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Staff",
    links: [{ href: "/admin", label: "Job requests" }],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-ink">
      <Container className="grid gap-14 py-20 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <Link href="/" className="flex items-center gap-2.5">
            <IconMark
              size={22}
              className="text-accent-green"
              style={{ transform: "translateY(-0.4px)" }}
            />
            <span className="text-sm font-semibold tracking-[0.22em] uppercase">
              {siteConfig.businessName}
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-muted">
            {siteConfig.shortDescription}
          </p>
          <div className="mt-6 space-y-1.5 text-sm">
            <a href={siteConfig.phoneHref} className="link-underline block w-fit text-ink">
              {siteConfig.phoneDisplay}
            </a>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-underline block w-fit text-ink-muted"
            >
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow text-ink-faint">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-ink-muted transition-colors duration-300 hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow text-ink-faint">Service area</h3>
            <p className="mt-5 text-sm leading-relaxed text-ink-muted">
              {siteConfig.serviceArea.primaryCities.join(" & ")}, part of the{" "}
              {siteConfig.serviceArea.region}.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-ink-faint">
              Expanding next to {siteConfig.serviceArea.expandingSoon.join(", ")}.
            </p>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-start justify-between gap-2 py-6 text-xs text-ink-faint sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {siteConfig.legalName}. All rights
            reserved.
          </p>
          <p>{siteConfig.legal.insuranceNote}</p>
        </Container>
      </div>
    </footer>
  );
}
