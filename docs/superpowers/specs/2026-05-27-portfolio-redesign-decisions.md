# Portfolio Redesign — Working Decisions Log

**Date:** 2026-05-27
**Status:** Brainstorming in progress (paused for ui-ux-pro-max skill install + session restart)
**Repo:** github.com/mereksor/Portfolio-Project · branch `main` (clean, even with origin)
**Local:** /Users/mereksoriano/Downloads/Claude Code/portfolio
**Stack:** Next.js 16.1.6 · React 19 · Tailwind v4 · MDX (next-mdx-remote, shiki, gray-matter)
**Live:** https://portfolio-project-kappa-ecru.vercel.app

> This file preserves all decisions made so far so a session restart loses nothing.
> On resume: read this file, then invoke the ui-ux-pro-max skill to generate the design
> system, mock it up for approval, then write the full design spec and implementation plan.

---

## Goal

**SCOPE NARROWED (2026-05-28): CONTENT ONLY — NO appearance/design changes.**
The user evaluated several UI elevation mockups (Analyst's Editorial, and a faithful "your site
but smoother" v2) and decided NOT to change the appearance at all. Keep the existing design
system, fonts, colors, layout, and motion exactly as they are.

Remaining work = update the **projects** section (4 projects total) and **update the resume**
content. Primary audience: **consulting recruiters** — content should signal analytical rigor,
quantified impact, structured problem-solving, and professional polish.

The ui-ux-pro-max skill is installed at `~/.claude/skills/ui-ux-pro-max/` for future use but is
NOT being applied to this change.

---

## Current design system (baseline to evolve, not replace)

- **Aesthetic:** editorial minimal — warm off-white (#FAFAFA), near-black ink (#09090B),
  crimson accent (#DC2626), zinc grays.
- **Fonts:** Libre Baskerville (display serif) · DM Sans (body) · DM Mono (mono labels).
- **Motion:** fadeUp w/ spring, scroll reveals, magnetic button, animated link underlines,
  section-title accent bars, tag fill, pulse dot, card-hover lift.
- **Components:** Header, Footer, ProjectCard, BlogPostCard, MagneticButton, ScrollReveal.
- **Routes:** `/` (home), `/projects`, `/projects/[slug]`, `/resume`, `/blog`, `/blog/[slug]`.

The user LIKES the current look — wants elevation in cleanliness, "advanced" feel, and animation,
NOT a teardown. Earlier low-fi A/B/C mockups (Refined Editorial / Modern Premium / Data-Forward)
were rejected as "none look better than what I have" — they were crude wireframes. Next attempt
must be HIGH-FIDELITY and driven by a real design system from ui-ux-pro-max.

---

## DECISION 1 — Projects (4 total)

Reduce from 5 MDX files to 4. Final set:

| # | Project | Status | Notes |
|---|---------|--------|-------|
| 1 | PCCW Mentor-Matching | **Completed** | Existing MDX `pwcc-mentor-matching.mdx` — update status to completed |
| 2 | DB Migration Agent | **Completed** | Existing MDX `db-migration-agent.mdx` — update status to completed |
| 3 | Roofing Route Optimization Engine | **In progress** | NEW MDX — see Decision 2 |
| 4 | AI-Powered Outreach Engine | **In design** | NEW MDX — lightweight placeholder, see Decision 3 |

**REMOVE these 3 MDX files** (no longer wanted):
- `cep-renewable-dashboard.mdx`
- `cornell-genai-automation.mdx`
- `ab-testing-framework.mdx`

---

## DECISION 2 — Roofing Route Optimization project (NEW, in progress)

Source docs read: "Route Optimization Scope of Work.pages" + "Data Verification Checklist.pages"
(both exported to /tmp/rosw.txt and /tmp/dvc.txt during this session; originals in ~/Downloads).

- **Client framing:** GENERIC — "a field services company." No company name, no geography,
  no industry tells beyond "field services." (Docs are marked Confidential.)
- **Status:** earliest stages (discovery / data verification).
- **Timeline:** starting now (May 2026) → target completion **end of August 2026**.
- **Role:** **sole developer** (Project Lead / Developer).
- **What it is:** a Dynamic Route Optimization Engine — ingests daily jobs, technician
  availability, and material orders, then auto-generates optimized daily schedules + driving
  routes for every field technician. Adapts in real time to cancellations / overruns.
- **Core innovation:** a material-to-time estimation model (predicts job duration from materials
  ordered; self-corrects from actuals over 60-90 days).
- **Architecture:** 3 layers — (1) data ingestion (CSV/Excel upload, later API), (2) OR-Tools
  optimization engine (job→tech assignment + route sequencing + time-window compliance, <60s for
  50-200 jobs), (3) dispatcher/technician/management dashboards + alerts.
- **Stack:** Python · Google OR-Tools · Google Maps API · Pandas · Streamlit · PostgreSQL · AWS/GCP.
- **5 phases:** core routing → material-to-time model → skills/availability constraints →
  real-time rerouting → full dashboards + reporting + API.
- **Quantified target metrics (for KPI chips / case-study framing):**
  - Jobs completed per technician per day: **+15-25%**
  - Total daily drive time per technician: **-20-30%**
  - Dispatcher planning time: **45-60 min → under 5 min**
  - Job-duration estimate accuracy: within 15% after 90 days
  - Customer on-time arrival rate: **+20%**
  - Fuel cost per technician per day: **-15-20%**
- **Consulting angle:** real ops problem, quantified business impact, phased delivery,
  OR + ML + product. Frame as a case study: Context → Problem → Approach → Impact.

---

## DECISION 3 — AI-Powered Outreach Engine (NEW, in design — lightweight entry)

- The actual tool is being designed in a SEPARATE spun-off session (see spawn_task chip
  "Brainstorm AI outreach + scraping tool"). Do NOT design the tool here.
- Portfolio entry is a short "In Design" placeholder. Draft copy:
  > **AI-Powered Outreach Engine** — A personal + Cornell GenAI Club tool that automates prospect
  > research and first-touch outreach. Scrapes LinkedIn for target contacts, enriches via Apollo,
  > and uses an LLM with a tuned system prompt to draft personalized, context-aware outreach at
  > scale — with a human approval step before anything sends. *Status: in design.*
- Stack (tentative, to firm up in the spun-off session): LinkedIn scraping · Apollo.io ·
  Python + LLM (Claude/OpenAI) · lightweight web UI · human-in-the-loop approval.
- Once the tool has substance, update this MDX with real detail.

---

## DECISION 4 — Resume updates

Resume page is hand-coded at `src/app/resume/page.tsx` (not data-driven). Current downloadable
PDF is `public/documents/resume.pdf` (Feb 18) — user is updating the PDF separately and will
include full projects there.

**Display decisions (PUBLIC web page):**
- **Phone:** OMITTED on public page (keep private; PDF can include it).
- **GPA:** INCLUDE (updated decision — overrides earlier "omit"). Exact framing:
  - `GPA: 3.3 / 4.0`
  - `Most Recent Semester: 3.6 GPA (22 credits; advanced ORIE coursework including
    Optimization, Stochastic Models, and Machine Learning)`
  - Rationale: recent 3.6 + rigorous courseload sets up an upward-trajectory story so the 3.3
    doesn't get auto-filtered. Trajectory framing, not excuse-making.
- **M.Eng. "Intended" entry:** KEEP (with its badge).
- **Projects on resume page:** OMIT the projects block; add a single CTA line at the bottom
  ("See full project case studies →") linking to /projects. Full projects live in the PDF + the
  Projects section of the site.

**Content updates (apply the user's newer resume text):**
- **Education:** B.S. ORIE, Minor in AI · Expected May 2027 · add GPA lines above ·
  update coursework to: Optimization Methods, Machine Learning & Data Science, Stochastic Models,
  Engineering Applications of OR, Financial & Managerial Accounting. Keep intended M.Eng.
- **AEP (Incoming, Summer 2026):** title + "Incoming" badge, **NO bullets yet** (not started).
- **Secretariat (Jun-Aug 2025):** updated bullets —
  - Analyzed construction scheduling and cost data across large-scale projects to identify delays,
    cost drivers, and risk factors
  - Built forecasting models and dashboards to assess timeline risk and financial exposure
  - Synthesized complex datasets into structured insights supporting valuation analysis and
    expert reporting
- **Student Agencies (Feb-Aug 2024):** updated bullets —
  - Led operations across 10+ national relocation projects, improving execution through workflow
    redesign and process standardization
  - Managed logistics system handling 10,000+ inventory items and fulfillment for 1,000+ customers
  - Directed an 80+ person team; implemented process improvements that contributed to a 10%
    increase in annual revenue
- **MAC Power Washing (May-Aug 2023):** updated bullets —
  - Built and operated a residential services business serving 30+ properties
  - Developed pricing strategy that generated $8K+ in profit and improved service consistency
- **Leadership:**
  - **Cornell GenAI Club — Head of Corporate Outreach (Feb 2025-Present):**
    - Secure and manage partnerships with firms including Cisco, Investcorp, and early-stage startups
    - Lead project execution and cross-functional coordination across AI initiatives
  - **Celsius — Lead Student Marketing Ambassador (Jul 2025-Present):** REWRITE to emphasize
    inventory + logistics (draft, pending tweaks):
    - Manage product inventory and distribution logistics, coordinating supply and fulfillment
      across 20+ campus organizations
    - Lead campus marketing initiatives and sampling campaigns to drive engagement and brand presence
  - **Chi Psi Fraternity — Lodge Manager &amp; Vice President** (Aug 2024 – May 2026) — UPDATED
    title, dates, and bullets per user (2026-05-28):
    - Managed operations for a 13,000 sq ft residential lodge on 3.5 acres, overseeing facility
      maintenance, vendor contracts, and budgeting for 30 residents and 60+ members
    - Planned and executed 4 large-scale formal events, managing logistics, vendor coordination,
      and budgets from concept through delivery
    - Led chapter leadership as Vice President, overseeing organizational planning, member
      accountability, and cross-functional operations
  - Cornell Men's Club Basketball — Team Member
  - Food Recovery Network — Recovery Officer
- **Skills & Interests:** LOCKED (2026-05-29) — 4-category structure that honestly reflects manual
  proficiency vs. AI-augmented capability. Strong consulting signal.
  - **Languages &amp; Data** *(manual proficiency)*: Python · SQL · Excel (Advanced Modeling) ·
    Tableau · Primavera P6 · Git
  - **AI Engineering**: LLM APIs (Claude / OpenAI) · LangGraph · Multi-Agent Systems ·
    Prompt Engineering · Agent Orchestration
  - **AI-Assisted Development** *(via Claude Code, Cursor)*: TypeScript · React / Next.js ·
    FastAPI · PostgreSQL
  - **Analytics &amp; Methods**: Data Analysis · Optimization · Predictive Modeling ·
    Statistical Analysis · Process Improvement · Workflow Automation
  - **Interests**: AI in Finance · Off-Grid Hiking · Snowboarding · Basketball
  - Dropped from earlier proposal: Google OR-Tools (user said "change"; removed for now),
    Google Maps API (user removed), Pandas (user dropped at the end).

---

## DECISION 5 — UI/UX elevation direction → DROPPED

- DROPPED per user (2026-05-28). No appearance changes. The existing design system, fonts,
  colors, layout, and animations remain untouched. New project MDX files and the resume edits
  must conform to the EXISTING components and styling (ProjectCard, resume/page.tsx patterns).

---

## OPEN ITEMS

- [ ] Confirm Celsius + Chi Psi bullet rewrites (drafts in Decision 4) with user.
- [ ] Confirm whether to add OR-Tools / web scraping to resume Skills.
- [ ] Confirm: keep "status: in-progress/upcoming" enum values valid for ProjectCard
      (ProjectCard renders 'upcoming' and 'in-progress'; need to confirm how 'completed' and
      'in-design' should display — may need a small enum addition, but NO visual restyle).
- [ ] Write the content-only implementation plan (writing-plans), then execute.

---

## Visual companion

Session dir: `.superpowers/brainstorm/` (gitignored). Restart server with
`scripts/start-server.sh --project-dir <portfolio>` when needed.
