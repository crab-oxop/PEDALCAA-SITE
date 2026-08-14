import type { Metadata } from "next";
import { Familjen_Grotesk, Fraunces, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
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

export const metadata: Metadata = {
  title: `${siteConfig.businessName} — Mobile Bike Repair, On Demand`,
  description: siteConfig.shortDescription,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${familjenGrotesk.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-void text-ink">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
