// One source for the canonical URL so metadata, sitemap, and robots stay in sync.
// Set NEXT_PUBLIC_SITE_URL in Vercel once the custom domain (mereksoriano.com) is live.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-project-kappa-ecru.vercel.app";
