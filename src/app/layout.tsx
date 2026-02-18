import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mereksoriano.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Merek Soriano | ORIE & AI",
    template: "%s | Merek Soriano",
  },
  description:
    "Merek Soriano — Cornell ORIE student building at the intersection of optimization, analytics, and AI. Resume, projects, and blog.",
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
        className={`${libreBaskerville.variable} ${dmSans.variable} ${dmMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
