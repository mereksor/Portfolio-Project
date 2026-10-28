// One source for the canonical URL so metadata, sitemap, and robots stay in sync.
// NEXT_PUBLIC_SITE_URL overrides for preview deploys; link previews use the custom domain.
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mereksoriano.com";
