# AEP Internship Hub + Deep Dives: Design

Date: 2026-10-27
Branch: `feat/aep-internship-hub`
Status: design approved in brainstorming, copy not yet drafted

## Goal

Show the Summer 2026 American Electric Power internship as real content on the portfolio, not just
resume bullets. One hub entry in the project list, with three deep-dive sub-pages. Consulting /
product / forward-deployed audiences should come away seeing judgment under real corporate
constraints, not a tool inventory.

## Source material and confidentiality

- Source: `Summer 2026 Internship Portfolio - Merek Soriano.pdf` (repo root, untracked). It contains
  unscrubbed internal details. **It must never be committed.** Add it to `.gitignore` or move it out of
  the repo before any commit that touches the root.
- The PDF has no real graphics (printed HTML, styled text boxes only). All visuals are new work.

### Scrub rules (apply to every AEP page)

- No people's names (coworkers, managers, executives).
- No internal system, tool, or library names, mailbox addresses, hostnames, file paths, employee IDs.
- No credential, authentication, or security-architecture details.
- No dollar savings figures anywhere.
- Numbers are rounded ("~2,000", not "2,051").
- Results from small validation sets are labeled as pilots.
- AEP itself is named (it is already on the resume).
- Site conventions: no em dashes, no emojis.

## Information architecture

| Route | Content file | Listed? |
|---|---|---|
| `/projects/aep-internship` | `content/projects/aep-internship.mdx` | Yes: `/projects` and homepage (featured) |
| `/projects/aep-internship/robotics-strategy` | `content/projects/aep-internship/robotics-strategy.mdx` | No |
| `/projects/aep-internship/pattern-mining` | `content/projects/aep-internship/pattern-mining.mdx` | No |
| `/projects/aep-internship/dual-pass-extraction` | `content/projects/aep-internship/dual-pass-extraction.mdx` | No |

- Hub frontmatter `date` is in August 2026, so date-desc sorting places it between ALICE (2026-09-06)
  and PCCW (2026-01-15) with no ordering code changes.
- `readMdxFiles` only reads top-level `.mdx` files, so sub-pages in the subfolder are excluded from
  listings automatically. Add a separate loader (e.g. `getSubProject(parent, slug)`,
  `getSubProjects(parent)`) for the nested files.
- New route `src/app/projects/[slug]/[sub]/page.tsx` with `generateStaticParams`, reusing the detail
  page's MDX rendering and prose styles.
- Sub-page frontmatter: `title`, `slug`, `description`, `parent: "aep-internship"`, `order` (1-3).
  Extend types with a `SubProject` interface (no `any`).
- Sub-pages get a back link to the hub and prev/next links between siblings by `order`.

## Hub page content

1. **Opening narrative**: role, summer 2026, the mix of strategy and build work. No stat strip.
2. **Library foundation diagram** (CSS/SVG): an internal zero-setup LLM client sits under the two
   build projects (pattern mining, dual-pass extraction); nodes link to their sub-pages. The library is
   described only as "made LLM access zero-setup for non-technical teammates." No distribution or
   credential details.
3. **Deep-dive cards** (3): Robotics strategy, Pattern mining, Dual-pass extraction.
4. **Constraint to Decision callouts** (3-4). Candidate list, each to be confirmed with Merek during
   copy drafting:
   - Internship-length timeline: shipped a rerunnable pattern-mining pipeline, RAG left on the roadmap.
   - No labeled ground truth: agreement between two independent extraction passes stands in for
     accuracy.
   - A downstream system depended on emails staying unread: inbox monitoring was strictly read-only.
   - Non-technical teammates as users: the LLM client needed zero setup.
5. **Also shipped** (1-2 lines each):
   - AI Office Hours: self-initiated 5-week program teaching teammates Python and LLM basics, with 5
     reference guides.
   - Invoice inbox monitor: daily reporting that had to stay strictly read-only.
   - Rate-sheet Excel stage: final stage of a multi-person pipeline; defined the data contract with
     teammates, integrated end-to-end, handed off.

## Sub-page content

### Robotics strategy

- Scored 48 robotics use cases on a four-part rubric (Impact, Effort, Maturity, Fit; 1-5) across
  Generation, Transmission, and Supply Chain, surfacing 6 Tier-1 priorities.
- Examples as generic categories only: wall-climbing inspection crawlers, quadruped plant-rounds
  robots, confined-space inspection drones. No vendor names, no per-plant numbers.
- Own vs. robots-as-a-service vs. hybrid economics and a multi-year roadmap: described as existing
  and what they compared, **no payback figures, no org-model or roadmap specifics**.
- Presented to VP/SVP-level leadership and secured buy-in for a multi-year initiative (no names).
- Visual: interactive 48 to 6 funnel in CSS/SVG; hover/tap a tier to see its rubric criteria and
  example categories.

### Pattern mining

- ~2,000 construction change orders, ~3,900 extracted insights, 10 themes; full run under ~80 min.
- Pipeline: LLM insight extraction, embeddings, clustering, cluster summaries, theme consolidation.
- Tested 5 to 25 clusters and picked 10 with a scoring rubric (granularity vs. actionability, no
  redundant themes).
- Themes broke out across planning, execution, and financial causes.
- Framing (Merek's words): clustering was chosen for the project's scope; RAG stayed in the pipeline
  for later implementation. The deliverable was a repeatable set of scripts that can be rerun on any
  fresh set of change order documents.
- Visual: Remotion player. Documents scatter into insight dots, dots form clusters, clusters
  consolidate into 10 themes.

### Dual-pass extraction

- Two independent LLM passes with deliberately different prompt styles extract the same fields from
  vendor order PDFs. Field-by-field disagreement sets High / Medium / Low confidence; Low routes to a
  human.
- OCR fallback: native PDF text first, automatic switch to OCR with image cleanup for scanned pages.
- Constraints: no labeled ground truth existed, so cross-pass agreement stood in for accuracy;
  vendor-agnostic prompts so new suppliers need no templates.
- Pilot results: 11 vendor PDFs, 6+ formats, 29 rows, 0 flagged. Always labeled a small pilot. Never
  phrased as "0 hallucinations."
- Visual: Remotion player. Two passes read the same document side by side; disagreeing fields light
  up and route to a human-review lane.

## Motion and performance

- Remotion (`remotion` + `@remotion/player`, pinned versions) used for exactly two players: pattern
  mining and dual-pass. Everything else is CSS/SVG reusing existing animation classes in
  `globals.css`.
- Players load via `next/dynamic` with `ssr: false`, only on their own sub-page, so the hub, list,
  and homepage bundles are unaffected.
- Reduced motion: players render a static poster frame (`useReducedMotion`-style `matchMedia` check);
  new CSS keyframes go in the `prefers-reduced-motion` block.
- Colors come from existing tokens with dark-mode overrides (`text-on-ink` on `bg-ink`).

## Out of scope (separate pieces)

1. Route optimizer scrub across site and resume sources (next, separate branch).
2. Site alignment pass from family feedback: "Seeking Forward Deployed / Applied AI Engineer"
   positioning, link preview URL fix, `pwcc` to `pccw` slug with redirect, GitHub/demo links, classes
   and 22 credits, power-washing founder story, resume page refresh.
3. Resume PDF update in career-ops, including rewording the AEP "RAG system" bullet to match the
   clustering story.
4. LinkedIn (manual by Merek).

## Open items for the copy-drafting session

- Confirm each Constraint to Decision callout.
- Draft hub and sub-page copy; Merek approves each page's public wording before merge.
- Visual companion for funnel, diagram, and player storyboards.

## Verification

`npm run build` (includes type check), `npm run lint`, visual smoke at localhost:3000 for all four
routes in light and dark mode plus reduced motion. Grep rendered HTML for scrub-list terms before
merge. Nothing pushed or deployed without Merek's approval.
