# Portfolio Content Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the content-only updates from the design spec — reduce projects from 5 to 4 (2 completed, 1 in progress, 1 in design), add two minimal data-driven status badges, and refresh the resume content. No aesthetic / design changes.

**Architecture:** Pure content + minimal data plumbing. Three project MDX files removed; two added; two refreshed. One TypeScript union extended (`status` adds `"in-design"`); one component (`ProjectCard.tsx`) gains two conditional badge blocks reusing the existing badge shape. Resume page JSX refreshed section-by-section in place. All work lands on a feature branch with six split commits matching the spec; a PR is opened for user review — no merge, no deploy without explicit user OK.

**Tech Stack:** Next.js 16.1.6 (App Router) · React 19 · TypeScript (strict) · Tailwind v4 · MDX (next-mdx-remote, shiki, gray-matter)

**Source Spec:** `docs/superpowers/specs/2026-05-28-portfolio-content-update-design.md`
**Decisions Log:** `docs/superpowers/specs/2026-05-27-portfolio-redesign-decisions.md`

**Note on TDD:** This repo has no test infrastructure (no `test` script in `package.json`, no `__tests__/`, no Jest/Vitest config). For each task, the verification gate is **`npm run build` (TypeScript + Next prod compile)** and **`npm run lint`** rather than failing tests. The final task adds a `npm run dev` visual smoke check at `http://localhost:3000`.

---

## File Inventory

**To delete (3):**
- `content/projects/cep-renewable-dashboard.mdx`
- `content/projects/cornell-genai-automation.mdx`
- `content/projects/ab-testing-framework.mdx`

**To create (2):**
- `content/projects/route-optimization-engine.mdx`
- `content/projects/ai-outreach-engine.mdx`

**To modify (5):**
- `content/projects/pwcc-mentor-matching.mdx` — frontmatter + body (status → completed, past tense, Outcome section)
- `content/projects/db-migration-agent.mdx` — frontmatter + body (title rename, status → completed, past tense, Outcome section, LangGraph in stack)
- `src/lib/types.ts` — add `"in-design"` to the `Project.status` union
- `src/components/ProjectCard.tsx` — append two conditional badge blocks
- `src/app/resume/page.tsx` — refresh section content; remove privacy footnote; add Selected Work CTA

**Total commits:** 6 + 1 housekeeping (branch creation has no commit). See Tasks 1–7.

---

## Task 0: Set up feature branch

**Files:** none modified.

- [ ] **Step 1: Confirm working tree is clean and on `main`.**

```bash
cd "/Users/mereksoriano/Downloads/Claude Code/portfolio"
git status --short
git rev-parse --abbrev-ref HEAD
```

Expected: empty `git status` (or only `?? docs/superpowers/`); branch reads `main`. If `docs/superpowers/` shows as untracked, that's expected — those are the spec + decisions docs we'll bring in as part of the first commit.

- [ ] **Step 2: Pull latest `main` so we branch off a current tree.**

```bash
git fetch origin
git pull --ff-only origin main
```

Expected: "Already up to date." or a fast-forward. If a non-FF would result, stop and ask the user.

- [ ] **Step 3: Create the feature branch.**

```bash
git checkout -b feat/content-update-2026-05
```

Expected: `Switched to a new branch 'feat/content-update-2026-05'`.

- [ ] **Step 4: Stage and commit the spec + decisions docs as a docs-only commit (so the rest of the branch reads cleanly).**

```bash
git add docs/superpowers/specs/2026-05-27-portfolio-redesign-decisions.md \
        docs/superpowers/specs/2026-05-28-portfolio-content-update-design.md \
        docs/superpowers/plans/2026-05-29-portfolio-content-update.md
git status --short
git commit -m "docs: add portfolio content-update spec, plan, and decisions log"
```

Expected: clean status after commit; one commit ahead of `origin/main`.

- [ ] **Step 5: Sanity-check `.gitignore` already covers the brainstorm scratch dir** (so we never accidentally commit it).

```bash
grep -F '.superpowers/' .gitignore
```

Expected: prints `.superpowers/` (added earlier in the session). If missing, append it: `echo '.superpowers/' >> .gitignore && git add .gitignore && git commit -m "chore: ignore .superpowers brainstorm scratch"`.

---

## Task 1: Remove three stale project MDX files

**Files:**
- Delete: `content/projects/cep-renewable-dashboard.mdx`
- Delete: `content/projects/cornell-genai-automation.mdx`
- Delete: `content/projects/ab-testing-framework.mdx`

- [ ] **Step 1: Verify the three files exist before deleting.**

```bash
ls -la content/projects/cep-renewable-dashboard.mdx \
       content/projects/cornell-genai-automation.mdx \
       content/projects/ab-testing-framework.mdx
```

Expected: three files listed. If any are missing, stop and reconcile against the spec before deleting the others.

- [ ] **Step 2: Delete the three MDX files via `git rm` (so they leave the working tree and the index together).**

```bash
git rm content/projects/cep-renewable-dashboard.mdx \
       content/projects/cornell-genai-automation.mdx \
       content/projects/ab-testing-framework.mdx
```

Expected: `rm 'content/projects/cep-renewable-dashboard.mdx'` (×3).

- [ ] **Step 3: Verify only the two remaining MDX files are left in `content/projects/`** (the new ones haven't been added yet).

```bash
ls content/projects/
```

Expected output:

```
db-migration-agent.mdx
pwcc-mentor-matching.mdx
```

- [ ] **Step 4: Build + lint must still pass.**

```bash
npm run lint
npm run build
```

Expected: both pass. The home page will temporarily render 2 featured projects (out of 3 slots) — that's fine for this intermediate state.

- [ ] **Step 5: Commit.**

```bash
git status --short
git commit -m "chore: remove three stale upcoming project MDX files"
```

Expected: two commits ahead of `origin/main` after Task 0's commit.

---

## Task 2: Add Route Optimization Engine project

**Files:**
- Create: `content/projects/route-optimization-engine.mdx`

- [ ] **Step 1: Create the new MDX file with the full case-study content** (from spec §4.1). Use the Write tool, exact contents below.

```mdx
---
title: "Route Optimization Engine"
slug: "route-optimization-engine"
description: "A dynamic scheduling and routing system for a field services company — turns daily jobs, technician availability, and material orders into optimized daily schedules and driving routes."
date: "2026-05-15"
tags: ["Optimization", "Python", "OR-Tools", "Field Services"]
featured: true
status: "in-progress"
---

## Overview

A Dynamic Route Optimization Engine for a field services company. The system ingests daily job data, technician availability, and material orders, then automatically generates optimized daily schedules and driving routes for every field technician — and adapts in real time when jobs run long, get cancelled, or technicians call out.

> *Client name withheld for confidentiality. Built solo as Project Lead and Developer.*

## Status

🔧 **In Progress** — May 2026 → target completion end of August 2026. Currently in discovery and data verification.

## The Problem

Every morning a dispatcher manually assigns jobs to technicians, guesses at travel time, and hopes the day goes smoothly. When a job runs long, someone cancels, or a technician calls out sick, the whole day falls apart. The cost of this chaos shows up in fuel, missed jobs, and unhappy customers.

## Approach

A three-layer system, each layer with a clear input and output so it can be updated independently:

- **Layer 1 — Data Ingestion**: CSV / Excel upload (later: direct API connection to existing work order software). Inputs are validated before processing; missing or invalid data is flagged immediately.
- **Layer 2 — Optimization Engine**: Solves three problems simultaneously — job-to-technician assignment, route sequencing, and customer time-window compliance. Runs in under 60 seconds for a typical day of 50–200 jobs.
- **Layer 3 — Output & Interface**: Dispatcher dashboard with map and override controls, mobile-friendly technician view with arrival times and job notes, management dashboard with summary metrics, and automated alerts when downstream jobs are at risk.

## Core Innovation — Material-to-Time Estimation Model

Rather than rely on dispatcher guesses for job duration, the system builds a predictive model using **materials ordered** as the primary input. Each kit or parts combination maps to a baseline time estimate; over time, as actual completion times come in, the model self-corrects — learning that a specific kit takes 2.5 hours on average, or that jobs in rainy weather run 20% longer. After 60–90 days of live operation, the model produces statistically reliable predictions automatically.

## Phased Delivery

Each phase delivers a working, usable product — the company doesn't have to wait until phase 5 to see value.

1. **Core routing engine** — addresses in, optimized driving routes per technician out
2. **Material-to-time estimation model** — realistic time buffers per job
3. **Skill matching & availability constraints** — only qualified, available technicians are assigned
4. **Real-time rerouting** — when a job is cancelled or runs long, affected technicians' remaining routes recalculate
5. **Dashboards, mobile view, reporting & API integrations** — production polish

## Target Impact

| Metric | Target |
| --- | --- |
| Jobs completed per technician per day | **+15–25%** |
| Total daily drive time per technician | **−20–30%** |
| Dispatcher planning time | **45–60 min → under 5 min** |
| Customer on-time arrival rate | **+20%** |
| Fuel cost per technician per day | **−15–20%** |
| Job-duration estimate accuracy | within 15% after 90 days |

## Tech Stack

Python · Google OR-Tools · Google Maps API · Pandas · Streamlit · PostgreSQL · AWS / GCP
```

- [ ] **Step 2: Verify the file exists with the expected slug.**

```bash
ls content/projects/route-optimization-engine.mdx
head -10 content/projects/route-optimization-engine.mdx
```

Expected: file present; frontmatter shows `title: "Route Optimization Engine"` and `slug: "route-optimization-engine"`.

- [ ] **Step 3: Build + lint.**

```bash
npm run lint
npm run build
```

Expected: pass. Next will pre-render the new project detail page at `/projects/route-optimization-engine`.

- [ ] **Step 4: Commit.**

```bash
git add content/projects/route-optimization-engine.mdx
git commit -m "feat: add Route Optimization Engine project (in progress)"
```

---

## Task 3: Add AI-Powered Outreach Engine project

**Files:**
- Create: `content/projects/ai-outreach-engine.mdx`

- [ ] **Step 1: Create the new MDX file** (from spec §4.4 — lightweight "In Design" entry).

```mdx
---
title: "AI-Powered Outreach Engine"
slug: "ai-outreach-engine"
description: "A personal and Cornell GenAI Club tool that automates prospect research and first-touch outreach — LinkedIn sourcing, Apollo enrichment, and LLM-personalized drafts with human approval."
date: "2026-05-01"
tags: ["AI/ML", "Automation", "LLM"]
featured: false
status: "in-design"
---

## Overview

A personal and Cornell Generative AI Club tool that automates the slowest, most repetitive parts of corporate outreach — prospect research and first-touch drafting — while keeping a human-in-the-loop for every send.

## Status

📐 **In Design** — Concept finalized; product and architecture brainstorm in progress in a dedicated session. Implementation begins after spec lock.

## Goals

- Source target contacts from LinkedIn at the company / role / signal level
- Enrich each prospect with Apollo.io firmographic and contact data
- Use an LLM with a tuned system prompt to draft personalized, context-aware first-touch outreach at scale
- Keep a human-in-the-loop approval step before anything is sent
- Support two modes: personal outreach, and Cornell GenAI Club corporate partnerships

## Tentative Stack

LinkedIn sourcing · Apollo.io API · LLM (Claude / OpenAI) · lightweight web UI · human approval workflow

*Full architecture, scraping approach, and ToS / compliance guardrails are being designed in the spun-off ideation session.*
```

- [ ] **Step 2: Verify the file is present and `featured: false`** (so it won't show on the homepage's 3-card slot).

```bash
ls content/projects/ai-outreach-engine.mdx
grep '^featured:' content/projects/ai-outreach-engine.mdx
```

Expected: file exists; `featured: false`.

- [ ] **Step 3: Build + lint.**

NOTE: at this point the build will produce a TypeScript error because `status: "in-design"` is not yet in the `Project.status` union — that's expected and fixed in Task 5. **Skip the build here** and rely on lint only:

```bash
npm run lint
```

Expected: pass. (Build will be re-enabled and required after Task 5.)

- [ ] **Step 4: Commit.**

```bash
git add content/projects/ai-outreach-engine.mdx
git commit -m "feat: add AI-Powered Outreach Engine project (in design)"
```

---

## Task 4: Mark PCCW and DB Migration as completed (refreshed copy)

**Files:**
- Modify: `content/projects/pwcc-mentor-matching.mdx`
- Modify: `content/projects/db-migration-agent.mdx`

- [ ] **Step 1: Rewrite `content/projects/pwcc-mentor-matching.mdx` entirely** with the past-tense + Outcome version (Write tool). Final contents:

```mdx
---
title: "PWCC Mentor-Mentee Matching Algorithm"
slug: "pwcc-mentor-matching"
description: "Refined the mentor–mentee assignment algorithm and built the full-stack admin interface for the President's Council of Cornell Women's matching program. ORIE 4999 project course."
date: "2026-01-15"
tags: ["Algorithms", "Optimization", "ORIE", "React"]
featured: true
status: "completed"
---

## Overview

Partnered with the President's Council of Cornell Women (PWCC) through Cornell's ORIE 4999 project course to refine and improve their mentor-mentee assignment algorithm. The work spanned algorithmic optimization on the backend and a full-stack admin interface for program administrators and participants.

## Status

✅ **Completed** — Algorithm refinements and frontend interface shipped to PWCC.

## Goals

- Analyze and improve the existing matching algorithm to maximize compatibility and stakeholder satisfaction
- Build a frontend UI for administrators to manage, review, and override assignments
- Add user-facing functionality for mentors and mentees to input preferences and view matches
- Validate algorithm performance through testing and stakeholder feedback

## Approach

- **Algorithm refinement** — evaluated the existing matching logic, identified inefficiencies, and implemented optimized assignment strategies using operations research techniques
- **Frontend development** — built interactive UI components for preference input, match visualization, and administrative override controls
- **Stakeholder collaboration** — worked directly with PWCC leadership to align technical solutions with program needs

## Outcome

The refined algorithm and admin interface were delivered to PWCC and are now in active use. Stakeholder feedback validated improved match quality, and program administrators have, for the first time, direct override and visualization tools — collapsing a previously manual review cycle into a single interface.

## Tech Stack

Python (algorithm) · React / Next.js (frontend) · Data analysis & validation tooling
```

- [ ] **Step 2: Rewrite `content/projects/db-migration-agent.mdx` entirely** with the renamed title + past-tense + Outcome version + LangGraph in stack (Write tool). Final contents:

```mdx
---
title: "AI-Driven CRM Migration Platform"
slug: "db-migration-agent"
description: "A multi-agent platform that automates and problem-solves data migration from legacy CRM and enterprise software systems. NBA 4920 — AI for Business Decisions."
date: "2026-01-20"
tags: ["AI/ML", "Agents", "Python", "Database"]
featured: true
status: "completed"
---

## Overview

An intelligent multi-agent platform built for Cornell's NBA 4920 (AI for Business Decisions) that automates the migration of data from legacy CRM and enterprise software. A primary orchestration agent coordinates specialized sub-agents that handle schema mapping, data transformation, validation, and error resolution.

## Status

✅ **Completed** — Final platform delivered as part of NBA 4920.

## Goals

- Design a multi-agent system with a primary orchestrator and specialized sub-agents for distinct migration tasks
- Automate schema analysis and field mapping between source (legacy) and target database structures
- Build intelligent error detection and resolution so the system problem-solves migration conflicts autonomously
- Reduce the manual effort and technical debt associated with legacy system migrations

## Architecture

- **Orchestrator Agent** — manages the migration pipeline, delegates tasks, and handles exceptions
- **Schema Mapping Agent** — analyzes source and target schemas, identifies field mappings, flags incompatibilities
- **Data Transformation Agent** — handles type conversions, data cleaning, and format normalization
- **Validation Agent** — runs integrity checks, surfaces data-loss risks, and generates migration reports

## Outcome

The platform was delivered as the NBA 4920 capstone. The multi-agent orchestration automated previously manual schema-mapping and transformation work, demonstrating that LLM-coordinated sub-agents can meaningfully reduce migration overhead on real legacy datasets.

## Tech Stack

Python · LLM APIs (orchestration & schema interpretation) · LangGraph (multi-agent coordination) · Database connectors · Validation framework
```

- [ ] **Step 3: Verify both frontmatter blocks now declare `status: "completed"`** and the DB Migration title was renamed:

```bash
grep -E '^(status|title|slug):' content/projects/pwcc-mentor-matching.mdx content/projects/db-migration-agent.mdx
```

Expected (order may differ):

```
content/projects/pwcc-mentor-matching.mdx:title: "PWCC Mentor-Mentee Matching Algorithm"
content/projects/pwcc-mentor-matching.mdx:slug: "pwcc-mentor-matching"
content/projects/pwcc-mentor-matching.mdx:status: "completed"
content/projects/db-migration-agent.mdx:title: "AI-Driven CRM Migration Platform"
content/projects/db-migration-agent.mdx:slug: "db-migration-agent"
content/projects/db-migration-agent.mdx:status: "completed"
```

- [ ] **Step 4: Lint** (skip build until Task 5 since `"in-design"` still isn't in the union):

```bash
npm run lint
```

Expected: pass.

- [ ] **Step 5: Commit.**

```bash
git add content/projects/pwcc-mentor-matching.mdx content/projects/db-migration-agent.mdx
git commit -m "feat: mark PCCW + DB Migration as completed, refresh copy"
```

---

## Task 5: Add "Completed" and "In Design" status badges

**Files:**
- Modify: `src/lib/types.ts`
- Modify: `src/components/ProjectCard.tsx`

- [ ] **Step 1: Confirm the current `status` union in `src/lib/types.ts`.**

```bash
sed -n '1,15p' src/lib/types.ts
```

Expected: line 11 currently reads `  status?: "upcoming" | "in-progress" | "completed";`.

- [ ] **Step 2: Extend the union to include `"in-design"`** via Edit tool — exact change:

```ts
// BEFORE (src/lib/types.ts:11)
  status?: "upcoming" | "in-progress" | "completed";

// AFTER
  status?: "upcoming" | "in-progress" | "completed" | "in-design";
```

- [ ] **Step 3: Add the two new conditional badge blocks in `src/components/ProjectCard.tsx`.** Locate the existing `in-progress` block (ends around line 30) and append the two new blocks immediately after it, inside the same `<div className="flex items-center gap-2">` parent.

Find this block (lines ~25–29):

```tsx
        {project.status === "in-progress" && (
          <span className="inline-block rounded bg-crimson/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-crimson">
            In Progress
          </span>
        )}
```

Use Edit to add the two new blocks **directly after** the closing `)}` of that block and **before** the closing `</div>` of the row. Insert:

```tsx
        {project.status === "completed" && (
          <span className="inline-block rounded bg-ink px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
            Completed
          </span>
        )}
        {project.status === "in-design" && (
          <span className="inline-block rounded bg-bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-secondary">
            In Design
          </span>
        )}
```

Rationale: identical geometry to the existing badges — only `bg-*` and `text-*` colors differ. Reuses the `bg-ink`, `text-white`, `bg-bg-muted`, and `text-ink-secondary` Tailwind tokens already declared via `@theme inline` in `globals.css`, so no new styling is introduced.

- [ ] **Step 4: Type-check + build + lint must now pass** (this is the first task where the build is required after Task 1).

```bash
npm run lint
npm run build
```

Expected: pass. If the build fails with `Type '"in-design"' is not assignable…`, re-confirm Step 2 was applied to `types.ts`.

- [ ] **Step 5: Commit.**

```bash
git add src/lib/types.ts src/components/ProjectCard.tsx
git commit -m "feat: add 'completed' and 'in-design' status badges to ProjectCard"
```

---

## Task 6: Refresh resume content

**Files:**
- Modify: `src/app/resume/page.tsx`

This is the largest content change of the plan. It edits the existing JSX file in place — same component, same animation classes, same Tailwind tokens. Each step is one focused edit; commit at the end of the task.

- [ ] **Step 1: Education BS entry — add GPA + recent semester lines and update coursework.**

Find the existing BS entry block in `src/app/resume/page.tsx` (around lines 32–46). Replace **only the inner contents** of that `<div>` with:

```tsx
            <h3 className="font-display font-semibold text-ink">
              Cornell University, College of Engineering
            </h3>
            <p className="font-mono text-sm text-ink-muted">
              Ithaca, NY &middot; Expected May 2027
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              B.S. Operations Research &amp; Information Engineering, Minor in Artificial Intelligence
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              GPA: 3.3 / 4.0
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              Most Recent Semester: 3.6 GPA (22 credits; advanced ORIE coursework including Optimization, Stochastic Models, and Machine Learning)
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              Relevant Coursework: Optimization Methods, Machine Learning &amp; Data Science, Stochastic Models, Engineering Applications of OR, Financial &amp; Managerial Accounting
            </p>
```

The M.Eng. "Intended" block immediately after stays unchanged.

- [ ] **Step 2: AEP entry — remove the two existing bullets** (user explicitly wants AEP bullet-free until they start).

Find the AEP `<ul className="mt-2 space-y-1.5 text-sm text-ink-muted">` block (the one immediately inside the "Business Process Improvement Intern" div, currently around lines 82–91). **Delete the entire `<ul>...</ul>` block** so the AEP entry ends with the company line `American Electric Power (AEP) &middot; Columbus, OH`.

After this step the AEP entry shows: title + "Upcoming" badge + dates + company line, nothing more.

- [ ] **Step 3: Secretariat — replace bullets with the sharper version.**

Find the Secretariat `<ul>` (currently around lines 105–118). Replace **the three `<li>` items** with the new copy:

```tsx
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Analyzed construction scheduling and cost data across large-scale projects to identify delays, cost drivers, and risk factors</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built forecasting models and dashboards to assess timeline risk and financial exposure</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Synthesized complex datasets into structured insights supporting valuation analysis and expert reporting</span>
              </li>
```

- [ ] **Step 4: Student Agencies — replace bullets.**

Find the Student Agencies `<ul>` (currently around lines 132–145). Replace the three `<li>` items:

```tsx
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Led operations across 10+ national relocation projects, improving execution through workflow redesign and process standardization</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Managed logistics system handling 10,000+ inventory items and fulfillment for 1,000+ customers</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Directed an 80+ person team; implemented process improvements that contributed to a 10% increase in annual revenue</span>
              </li>
```

- [ ] **Step 5: MAC Power Washing — replace bullets (2 bullets, not 3).**

Find the MAC Power Washing `<ul>` (currently around lines 159–168). Replace the **two** `<li>` items (the existing block has two — same shape, new copy):

```tsx
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built and operated a residential services business serving 30+ properties</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Developed pricing strategy that generated $8K+ in profit and improved service consistency</span>
              </li>
```

- [ ] **Step 6: GenAI Club — tighten bullets from 4 to 2.**

Find the Cornell Generative AI Club `<ul>` (currently around lines 187–204; four `<li>` items). Replace with the new two-bullet version:

```tsx
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Secure and manage partnerships with firms including Cisco, Investcorp, and early-stage startups</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Lead project execution and cross-functional coordination across AI initiatives</span>
              </li>
```

- [ ] **Step 7: Celsius — replace bullets with the inventory/logistics-forward rewrite.**

Find the Celsius `<ul>` (currently around lines 217–230; three `<li>` items). Replace the three `<li>` items with the new two-bullet version (yes, the block becomes two bullets):

```tsx
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Manage product inventory and distribution logistics, coordinating supply and fulfillment across 20+ campus organizations</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Lead campus marketing initiatives and sampling campaigns to drive engagement and brand presence</span>
              </li>
```

- [ ] **Step 8: Chi Psi — replace the entire entry (new title, new dates, three new bullets).**

Find the Chi Psi entry block (currently around lines 233–246). Replace the inner contents of the wrapping `<div>` with:

```tsx
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Lodge Manager &amp; Vice President
              </h3>
              <span className="font-mono text-xs text-ink-faint">Aug 2024 &ndash; May 2026</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Chi Psi Fraternity &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Managed operations for a 13,000 sq ft residential lodge on 3.5 acres, overseeing facility maintenance, vendor contracts, and budgeting for 30 residents and 60+ members</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Planned and executed 4 large-scale formal events, managing logistics, vendor coordination, and budgets from concept through delivery</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Led chapter leadership as Vice President, overseeing organizational planning, member accountability, and cross-functional operations</span>
              </li>
            </ul>
```

This removes the prior "Former Property Manager" italic line and replaces it with the structured three-bullet block.

- [ ] **Step 9: Skills & Interests — replace the 2-column grid with 5 stacked groups.**

Find the Skills section (currently around lines 274–291). Replace the inner `<div className="mt-4 grid gap-5 sm:grid-cols-2 border-l-2 border-crimson pl-6">…</div>` and its two children with this **vertically stacked** version inside the same rail:

```tsx
        <div className="mt-4 space-y-5 border-l-2 border-crimson pl-6">
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">
              Languages &amp; Data <span className="text-ink-faint font-normal">(manual proficiency)</span>
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Python &middot; SQL &middot; Excel (Advanced Modeling) &middot; Tableau &middot; Primavera P6 &middot; Git
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">AI Engineering</h3>
            <p className="mt-1 text-sm text-ink-muted">
              LLM APIs (Claude / OpenAI) &middot; LangGraph &middot; Multi-Agent Systems &middot; Prompt Engineering &middot; Agent Orchestration
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">
              AI-Assisted Development <span className="text-ink-faint font-normal">(via Claude Code, Cursor)</span>
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              TypeScript &middot; React / Next.js &middot; FastAPI &middot; PostgreSQL
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">Analytics &amp; Methods</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Data Analysis &middot; Optimization &middot; Predictive Modeling &middot; Statistical Analysis &middot; Process Improvement &middot; Workflow Automation
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">Interests</h3>
            <p className="mt-1 text-sm text-ink-muted">
              AI in Finance &middot; Off-Grid Hiking &middot; Snowboarding &middot; Basketball
            </p>
          </div>
        </div>
```

This reuses the existing rail (`border-l-2 border-crimson pl-6`) and existing typography classes — no new styling.

- [ ] **Step 10: Add the "Selected Work" CTA section** between Skills (stagger-4) and Contact (currently stagger-5).

Right after the closing `</section>` of Skills & Interests and before the Contact `<section>`, insert this new section using `stagger-5`:

```tsx
      {/* Selected Work CTA — links to the dedicated Projects section */}
      <section className="animate-fade-up stagger-5 mt-14">
        <p className="section-label">Selected Work</p>
        <div className="mt-4 border-l-2 border-crimson pl-6">
          <a href="/projects" className="link-underline text-sm font-medium text-crimson">
            See full project case studies &rarr;
          </a>
        </div>
      </section>
```

- [ ] **Step 11: Bump the Contact section's stagger from `stagger-5` to `stagger-6`** so the animation order still flows correctly with the new CTA inserted before it. Find:

```tsx
      <section className="animate-fade-up stagger-5 mt-14">
        <p className="section-label">Contact</p>
```

Change `stagger-5` to `stagger-6`:

```tsx
      <section className="animate-fade-up stagger-6 mt-14">
        <p className="section-label">Contact</p>
```

(`stagger-6` is already defined in `src/app/globals.css` — no CSS change needed.)

- [ ] **Step 12: Remove the privacy footnote** at the end of the resume page.

Find this block (currently the last element before the closing `</div>` of the page wrapper):

```tsx
      <p className="mt-14 text-xs text-ink-faint">
        Note: This is a public-facing resume. Home address and phone number are
        intentionally omitted for privacy. Contact me via email or LinkedIn for
        full details.
      </p>
```

**Delete the entire `<p>` block.** The page now ends with the Contact section.

- [ ] **Step 13: Lint + build must pass.**

```bash
npm run lint
npm run build
```

Expected: pass. If TypeScript flags an unused import or stray expression, re-check the edits.

- [ ] **Step 14: Local dev visual smoke check.** Free port 3000 first in case another Claude session occupies it (per the user's CLAUDE.md gotcha).

```bash
sudo lsof -ti:3000 | xargs sudo kill -9 2>/dev/null || true
npm run dev
```

Open `http://localhost:3000/resume` and confirm:

- GPA `3.3 / 4.0` and the "Most Recent Semester" line render under the BS entry.
- AEP entry shows title + "Upcoming" badge + dates + company only — no bullet list.
- Secretariat, Student Agencies, MAC Power Washing bullets show the new copy.
- GenAI Club shows 2 bullets, Celsius shows 2 bullets (logistics-forward), Chi Psi shows the new title + dates + 3 bullets.
- Skills section renders 5 stacked groups (Languages & Data, AI Engineering, AI-Assisted Development, Analytics & Methods, Interests).
- A new "Selected Work" section sits between Skills and Contact with the CTA `See full project case studies →` linking to `/projects`.
- The privacy footnote is gone — the page ends with the Contact section.

Stop the dev server with `Ctrl+C` when finished.

- [ ] **Step 15: Commit.**

```bash
git add src/app/resume/page.tsx
git commit -m "feat: refresh resume content (GPA framing, bullets, 5-group skills, projects CTA)"
```

---

## Task 7: Final verification + open PR

**Files:** none modified — verification and handoff only.

- [ ] **Step 1: Confirm the branch is exactly 6 commits ahead of `origin/main`** (Task 0 docs + Tasks 1–6 features).

```bash
git log --oneline origin/main..HEAD
```

Expected:

```
<sha> feat: refresh resume content (GPA framing, bullets, 5-group skills, projects CTA)
<sha> feat: add 'completed' and 'in-design' status badges to ProjectCard
<sha> feat: mark PCCW + DB Migration as completed, refresh copy
<sha> feat: add AI-Powered Outreach Engine project (in design)
<sha> feat: add Route Optimization Engine project (in progress)
<sha> chore: remove three stale upcoming project MDX files
<sha> docs: add portfolio content-update spec, plan, and decisions log
```

If a commit is missing, stop and reconcile before pushing.

- [ ] **Step 2: Full build + lint as a final gate.**

```bash
npm run lint
npm run build
```

Expected: pass.

- [ ] **Step 3: Final visual smoke check on all relevant pages.**

```bash
sudo lsof -ti:3000 | xargs sudo kill -9 2>/dev/null || true
npm run dev
```

Open and verify in order:

1. `http://localhost:3000/` — Selected Work shows exactly 3 cards in order **Route Optimization Engine** (In Progress badge) → **AI-Driven CRM Migration Platform** (Completed badge) → **PWCC Mentor-Mentee Matching Algorithm** (Completed badge).
2. `http://localhost:3000/projects` — all 4 cards in order **Route Optimization Engine** → **AI-Powered Outreach Engine** (In Design badge) → **AI-Driven CRM Migration Platform** → **PWCC Mentor-Mentee Matching Algorithm**.
3. `http://localhost:3000/projects/route-optimization-engine` — case-study MDX renders with KPI table.
4. `http://localhost:3000/projects/ai-outreach-engine` — lightweight In-Design MDX renders.
5. `http://localhost:3000/projects/db-migration-agent` — past-tense + Outcome MDX renders; title reads **"AI-Driven CRM Migration Platform"**.
6. `http://localhost:3000/projects/pwcc-mentor-matching` — past-tense + Outcome MDX renders.
7. `http://localhost:3000/resume` — all §6 changes per Task 6 step 14 checklist.

Stop the dev server with `Ctrl+C`.

- [ ] **Step 4: Push the branch to GitHub.**

```bash
git push -u origin feat/content-update-2026-05
```

Expected: branch is created on `origin`.

- [ ] **Step 5: Open the PR (do not merge).**

```bash
gh pr create --title "Portfolio content update: 4 projects, refreshed resume, status badges" --body "$(cat <<'EOF'
## Summary

Content-only update to the portfolio per the design spec.

- Reduce projects from 5 to 4: keep PWCC + DB Migration (now completed), add **Route Optimization Engine** (in progress) and **AI-Powered Outreach Engine** (in design). Remove three stale upcoming entries.
- Refresh the resume: new GPA framing with recent-semester trajectory, sharper bullets across Secretariat / Student Agencies / MAC / GenAI Club / Celsius, full rewrite of Chi Psi (Lodge Manager & VP, 3 new bullets), AEP kept bullet-free until start, Skills section restructured into 5 grouped buckets honestly distinguishing manual vs. AI-assisted proficiency.
- Add two minimal data-driven status badges to ProjectCard (Completed = dark ink, In Design = muted neutral); extend the \`status\` union with \`"in-design"\`. No aesthetic / design changes.

## Spec & plan

- Spec: \`docs/superpowers/specs/2026-05-28-portfolio-content-update-design.md\`
- Plan: \`docs/superpowers/plans/2026-05-29-portfolio-content-update.md\`
- Decisions log: \`docs/superpowers/specs/2026-05-27-portfolio-redesign-decisions.md\`

## Test plan

- [ ] \`npm run lint\` passes
- [ ] \`npm run build\` passes
- [ ] Homepage shows 3 cards: Roofing → CRM Migration → PWCC (in that order, with correct badges)
- [ ] Projects page shows all 4 in date-desc order, with the new In Design badge on Outreach
- [ ] Each of the 4 project detail pages renders its MDX
- [ ] Resume page reflects all content updates: GPA + recent-semester line, AEP bullet-free, Celsius / Chi Psi rewrites, 5-group Skills, Selected Work CTA, privacy footnote removed
- [ ] No visual regressions vs the current live site at the same viewport widths (375 / 768 / 1024 / 1440)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```

Expected: a PR URL is returned. **Do not merge.** Hand the URL to the user for review.

- [ ] **Step 6: Report back to the user** with:
  1. The PR URL.
  2. The 7-commit log (`git log --oneline origin/main..HEAD`).
  3. A reminder that nothing is merged or deployed; the next move is the user's review.

---

## Out of Scope (do not touch in this plan)

- Any change to `globals.css`, fonts, color tokens, layout, motion system, header, footer, or page-level chrome beyond what Task 5 (badges) and Task 6 (resume content + CTA placement + footnote removal) require.
- Cover images for the two new projects (`coverImage:` in MDX frontmatter is intentionally omitted — defer per user).
- The AI Outreach tool itself — that's in a separate spun-off session.
- The downloadable resume PDF at `public/documents/resume.pdf` — user updates separately.
- Blog content.
- Any merge or deploy step. The PR is opened; the user reviews and clicks Merge themselves.

---

## Acceptance Criteria Recap

(from spec §10, reproduced here for the executor's reference)

- `npm run build` and `npm run lint` pass on the final commit.
- Homepage Selected Work shows exactly 3 cards: Roofing → DB Migration → PCCW (sorted by date desc, all `featured: true`).
- Projects page lists all 4 in this order: Roofing → Outreach → DB Migration → PCCW (date desc).
- Each project detail page renders its updated MDX correctly.
- Resume page reflects all §6 content; no phone visible; GPA + recent-semester line present; M.Eng. badge present; AEP shown with "Incoming" badge and no bullets; Celsius and Chi Psi bullets per §6.4; Skills section in the four-group + Interests layout; CTA links to `/projects`; the prior privacy footnote is removed.
- TypeScript strict mode compiles; `status: "in-design"` recognized.
- No visual regressions on mobile or desktop versus the current live site.
