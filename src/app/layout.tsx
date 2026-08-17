import type { Metadata } from "next";
import { Familjen_Grotesk, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { siteConfig } from "@/lib/site-config";

// Body/UI face — deliberately not Geist/Inter/system-ui, which read as
// default AI-tool scaffolding regardless of layout polish.
const familjenGrotesk = Familjen_Grotesk({
  variable: "--font-familjen",
  subsets: ["latin"],
  weight: "variable",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const title = `${siteConfig.businessName} — Mobile Bike Repair, On Demand`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: title,
    // Inner pages set their own title via generateMetadata/export const
    // metadata and this template appends the brand name automatically.
    template: `%s — ${siteConfig.businessName}`,
  },
  description: siteConfig.shortDescription,
  keywords: [
    "mobile bike repair",
    "bike repair Toronto",
    "bike repair Richmond Hill",
    "on-demand bike mechanic",
    "PedalCAA",
    "bicycle repair GTA",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.businessName,
    title,
    description: siteConfig.shortDescription,
    locale: "en_CA",
    images: [
      {
        url: "/images/bikes/bike-hybrid-black.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.businessName} — mobile bike repair`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: siteConfig.shortDescription,
    images: ["/images/bikes/bike-hybrid-black.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${familjenGrotesk.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <LocalBusinessSchema />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
