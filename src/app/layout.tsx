import type { Metadata } from "next";
import { Newsreader, DM_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { siteUrl } from "@/lib/site";
import "./globals.css";

// Newsreader is a variable serif with optical sizing, so large hero type stays crisp
// at light weights while small headings can still go semibold.
const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Merek Soriano | ORIE & AI",
    template: "%s | Merek Soriano",
  },
  description:
    "Merek Soriano. Cornell ORIE student building at the intersection of optimization, analytics, and AI. Projects, current work, and resume.",
  openGraph: {
    title: "Merek Soriano | ORIE & AI",
    description:
      "Cornell ORIE student building at the intersection of optimization, analytics, and AI.",
    url: siteUrl,
    siteName: "Merek Soriano",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merek Soriano | ORIE & AI",
    description:
      "Cornell ORIE student building at the intersection of optimization, analytics, and AI.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${newsreader.variable} ${dmSans.variable} ${dmMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
