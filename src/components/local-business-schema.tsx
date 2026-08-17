import { siteConfig } from "@/lib/site-config";

// Structured data (JSON-LD) so Google can understand this is a local mobile
// bike-repair business and show it correctly in Search/Maps (name, service
// area, hours, contact). See https://schema.org/LocalBusiness.
//
// TODO: once siteConfig.phoneDisplay/phoneHref are filled in with the real
// number, this schema will automatically pick them up — no changes needed
// here.
export function LocalBusinessSchema() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.businessName,
    legalName: siteConfig.legalName,
    description: siteConfig.shortDescription,
    url: siteConfig.url,
    telephone: siteConfig.phoneHref.replace("tel:", ""),
    email: siteConfig.email,
    image: `${siteConfig.url}/images/bikes/bike-hybrid-black.jpg`,
    priceRange: "$$",
    areaServed: [
      ...siteConfig.serviceArea.primaryCities,
      ...siteConfig.serviceArea.expandingSoon,
    ].map((city) => ({
      "@type": "City",
      name: city,
    })),
    address: {
      "@type": "PostalAddress",
      addressRegion: "ON",
      addressCountry: "CA",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "20:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Saturday", "Sunday"],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [siteConfig.social.instagram, siteConfig.social.facebook],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
