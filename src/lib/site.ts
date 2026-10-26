// One source for the canonical URL so metadata, sitemap, and robots stay in sync.
// Stays on the vercel.app URL until mereksoriano.com has DNS and SSL; then set
// NEXT_PUBLIC_SITE_URL=https://mereksoriano.com in Vercel (or change this fallback).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-project-kappa-ecru.vercel.app";
