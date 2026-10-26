# Portfolio — Claude Context

Personal portfolio site for Merek Soriano. Public-facing, consulting-recruiting focused.

**Repo:** https://github.com/mereksor/Portfolio-Project
**Live:** https://portfolio-project-kappa-ecru.vercel.app (Vercel, auto-deploys `main`)
**Local:** `/Users/mereksoriano/Downloads/Claude Code/portfolio/`

---

## Stack

Next.js 16.1.6 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · MDX (next-mdx-remote, shiki, gray-matter, rehype-pretty-code) · @vercel/analytics

## Layout

```
content/
  projects/*.mdx        # 4 project files, frontmatter + body, loaded by lib/content.ts
src/
  app/
    layout.tsx           # root, fonts, header/footer wrapper, analytics
    page.tsx             # homepage (signal-field hero, Now section + log, selected projects, contact)
    projects/
      page.tsx           # /projects index
      [slug]/page.tsx    # /projects/{slug} detail; renders MDX through renderMdx()
      TagFilter.tsx
    resume/page.tsx      # hand-coded resume content (not data-driven)
    globals.css          # design tokens, animations, prose-editorial overrides
  components/
    Header.tsx           # sticky nav with sliding indicator + hover pill
    Footer.tsx
    ProjectRow.tsx       # index-style project row (home + /projects)
    StatusBadge.tsx      # single source for the 4 status badges
    SignalField.tsx      # canvas hero animation (pauses off screen, static under reduced motion)
    KineticHeading.tsx   # server-rendered word-rise headline (CSS only)
    RotatingWord.tsx     # cycling hero word
    MagneticButton.tsx
    ScrollReveal.tsx
  lib/
    types.ts             # Project interface
    site.ts              # siteUrl from NEXT_PUBLIC_SITE_URL (fallback: the vercel.app URL)
    content.ts           # filesystem MDX loader (gray-matter)
    mdx.ts               # compileMDX wrapper with rehype-pretty-code
public/documents/resume.pdf   # downloadable resume (user updates manually)
docs/superpowers/             # spec, plan, decisions logs (kept in repo for traceability)
```

## Run

```bash
cd "/Users/mereksoriano/Downloads/Claude Code/portfolio"
npm run dev      # default port 3000
npm run build    # production build, also runs TypeScript check
npm run lint     # ESLint
# No test infra. Verification = build + lint + visual smoke at localhost:3000.
```

## Conventions (USER PREFERENCES — IMPORTANT)

- **No em dashes anywhere.** Use periods, colons, commas, bullets, or rephrase. Em dashes have been swept from src/ and content/; keep them out going forward.
- **No emojis anywhere.** Status badges and copy are emoji-free.
- **Status enum on `Project.status`** is `"upcoming" | "in-progress" | "completed" | "in-design"`. `components/StatusBadge.tsx` maps each value to a label and style; add new statuses there.
- **MDX content style:** tight, sharp, scannable. Short paragraphs (2–3 sentences). Lead with the strongest sentence. Recruiter-scannable.
- **Frontmatter fields:** `title`, `slug`, `description`, `date`, `tags`, `featured`, `status`. Optional: `githubUrl`, `liveUrl`, `coverImage`. The detail page surfaces `githubUrl` as a "View Source" link.
- **Homepage shows up to 4 featured projects** (`getFeaturedProjects()` filters `featured: true`, sorts by date desc, slices to 4). Projects page shows all. No blog (removed 2026-10).
- **Colors are tokens with a dark-mode override** in `globals.css`. Use `text-on-ink` (not `text-white`) on `bg-ink` surfaces so dark mode inverts correctly.
- **Motion must respect reduced motion.** New CSS keyframe classes go in the `prefers-reduced-motion` block at the end of `globals.css`; JS motion checks `matchMedia`.
- **Resume page is hand-coded TSX**, not data-driven. The downloadable PDF at `public/documents/resume.pdf` is maintained separately by the user.
- **Existing animation classes** (`animate-fade-up`, `stagger-1..6`, `reveal`, `card-hover`, `kinetic-word`, `rotator`, `dot-grid`, `frame-corners`) are defined in `src/app/globals.css`. Reuse them rather than introducing new motion.

## Gotchas

- **Tailwind v4 + Turbopack silently strip nested `:where()` inside `:not()` selectors.** The rule may appear in the source CSS but vanish from the compiled bundle, or land with broken specificity. Use simple selectors like `.prose-editorial code` instead. See the inline-code styling in `src/app/globals.css` for the pattern.
- **Next.js dev server returns HTTP 200 on its error overlay pages.** Don't trust curl status alone — grep the body for "Module not found" or known content markers when smoke-testing.
- **Background `npm run dev` started via Claude Code's Bash tool gets killed between idle turns.** Run the dev server in your own terminal if you want it to survive a long visual review.
- **The `prose-editorial` class only sets prose CSS variables (colors).** It does NOT apply the typography defaults on its own. The `prose` class from `@tailwindcss/typography` MUST be present alongside it for headings, lists, tables, and blockquotes to render correctly.
- **Per-section reveal animations** on prose blocks use `.prose-editorial > *` with staggered `animation-delay`. Honors `prefers-reduced-motion`. Don't add a wrapper-level `animate-fade-up` to the prose container — it fights with the per-child animation.
- **`next.config.ts` is fine in Next.js 16.** (This is the gotcha in the global CLAUDE.md but it was Next 14-specific.)
- **Port 3000 may be in use by another Claude session.** Free with `lsof -ti:3000 | xargs kill -9` (sudo only needed if the process was started under another user).

## Git / Branches

- **`main`** is the production branch. Vercel auto-deploys it.
- **Feature branches** off `main`, named `feat/...` or `fix/...` or `chore/...`. The 2026-05 content refresh shipped on `feat/content-update-2026-05` and was merged via PR #1.
- **Split commits** by concern (feat / fix / chore / docs / style). Don't bundle mixed-concern changes.
- **Never amend.** Create new commits.
- **Never push to `main` directly.** Always go through a PR.
- **Never merge a PR without explicit user OK.**
- **SSH remote** (`git@github.com:mereksor/Portfolio-Project.git`), not HTTPS.

## Tooling

- **`gh` CLI** is installed at `~/.local/bin/gh` (direct binary, not via brew). PATH is wired in `~/.zshrc`. After `gh auth login -w` runs once, `gh pr create` / `gh pr view` work directly from any terminal.
- **No brew on this machine** — install dev tooling via direct binary downloads to `~/.local/bin/`.

## Future Work (post-PR-1)

- Consider adding `coverImage` to project frontmatter once you have images.
- The downloadable resume PDF at `public/documents/resume.pdf` is from Feb 18. Update when you finish the new formatted version.
