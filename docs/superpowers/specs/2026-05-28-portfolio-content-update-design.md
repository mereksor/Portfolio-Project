# Portfolio Content Update — Design Spec

**Date:** 2026-05-28 (locked 2026-05-29)
**Status:** Spec — awaiting user review before plan
**Repo:** github.com/mereksor/Portfolio-Project · branch `main`
**Local:** `/Users/mereksoriano/Downloads/Claude Code/portfolio`
**Audience:** consulting recruiters (MBB + boutiques) — analytical rigor, quantified impact,
structured problem-solving, professional polish.
**Companion log:** `docs/superpowers/specs/2026-05-27-portfolio-redesign-decisions.md`

---

## 1. Summary

A **content-only** update to the portfolio. Reduce projects from 5 to 4 (2 completed, 1 in
progress, 1 in design), apply detailed resume content updates, and add minimal data-driven
status badges for completed and in-design projects. **No aesthetic / design changes.**

## 2. Constraints (hard)

- **No changes to:** `globals.css` design tokens, fonts, header layout, footer, page layouts,
  motion/animation system, color palette, typography scale, ProjectCard structure beyond a
  conditional badge block.
- **Only changes allowed:** content (MDX, resume `tsx` text), a `status` enum addition in
  `lib/types.ts`, and two conditional badge blocks in `ProjectCard.tsx` that reuse the existing
  badge shape (`rounded px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`).
- **The live site at https://portfolio-project-kappa-ecru.vercel.app must look the same** after
  the change, except for: project list contents, resume content, and the two new status badges
  on completed / in-design cards.

## 3. Files

### 3.1 Remove
- `content/projects/cep-renewable-dashboard.mdx`
- `content/projects/cornell-genai-automation.mdx`
- `content/projects/ab-testing-framework.mdx`

### 3.2 Add
- `content/projects/route-optimization-engine.mdx` — see §4.1
- `content/projects/ai-outreach-engine.mdx` — see §4.4

### 3.3 Modify
- `content/projects/pwcc-mentor-matching.mdx` — see §4.2 (status → completed; rewrite to past tense)
- `content/projects/db-migration-agent.mdx` — see §4.3 (status → completed; rewrite to past tense)
- `src/lib/types.ts` — add `"in-design"` to the `status` union (see §5)
- `src/components/ProjectCard.tsx` — add two new conditional badge blocks (see §5)
- `src/app/resume/page.tsx` — apply all resume content updates (see §6)

## 4. Project content

> **Date scheme** (drives sort order; newest first on Projects page):
> Roofing `2026-05-15` → Outreach `2026-05-01` → DB Migration `2026-01-20` → PCCW `2026-01-15`
>
> **`featured: true`** on Roofing, PCCW, DB Migration → homepage shows those 3 sorted by date
> (Roofing, DB Migration, PCCW). Outreach is `featured: false` → Projects page only.

### 4.1 Route Optimization Engine — NEW (In Progress)

**File:** `content/projects/route-optimization-engine.mdx`

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

### 4.2 PWCC Mentor-Matching Optimization — UPDATE (Completed)

**File:** `content/projects/pwcc-mentor-matching.mdx`

Frontmatter changes:
- `description` → past tense: *"Refined the mentor–mentee assignment algorithm and built the full-stack admin interface for the President's Council of Cornell Women's matching program. ORIE 4999 project course."*
- `status: "completed"`
- everything else unchanged (date, tags, featured: true)

Body — rewrite to past tense and add an Outcome section. Drafted content:

```mdx
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

The refined algorithm and admin interface are in use by PWCC. Stakeholder feedback validated improved match quality, and administrators now have direct override and visualization tools that previously did not exist.

## Tech Stack

Python (algorithm) · React / Next.js (frontend) · Data analysis & validation tooling
```

### 4.3 AI CRM Migration Platform — UPDATE (Completed)

**File:** `content/projects/db-migration-agent.mdx`

Frontmatter changes:
- `title` → `"AI-Driven CRM Migration Platform"` (matches the wording in the user's updated PDF resume text — Decision 4 in the working log). Slug stays `db-migration-agent` (no URL change).
- `description` → past tense: *"A multi-agent platform that automates and problem-solves data migration from legacy CRM and enterprise software systems. NBA 4920 — AI for Business Decisions."*
- `status: "completed"`
- everything else unchanged

Body — rewrite to past tense and add an Outcome section. Drafted content:

```mdx
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

The platform was delivered as the NBA 4920 capstone. Multi-agent orchestration successfully automated previously manual schema and transformation work, demonstrating that LLM-coordinated sub-agents can meaningfully reduce migration overhead on real legacy data.

## Tech Stack

Python · LLM APIs (orchestration & schema interpretation) · LangGraph (multi-agent coordination) · Database connectors · Validation framework
```

### 4.4 AI-Powered Outreach Engine — NEW (In Design, lightweight)

**File:** `content/projects/ai-outreach-engine.mdx`

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

## 5. Type + ProjectCard changes (data-driven, not aesthetic)

### 5.1 `src/lib/types.ts`

Extend the `status` union:

```ts
status?: "upcoming" | "in-progress" | "completed" | "in-design";
```

### 5.2 `src/components/ProjectCard.tsx`

Append two conditional badge blocks alongside the existing `upcoming` and `in-progress` blocks
inside the `cardtop` flex container. **Reuse the existing badge shape** (`inline-block rounded
px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider`); only color varies:

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

Rationale: dark ink badge = shipped / strong; muted neutral = early stage. Identical geometry to
the existing crimson-wash chips, so the system reads as one badge family — not new visual design.

## 6. Resume content (full final text)

**File:** `src/app/resume/page.tsx` — replace the relevant sections with the content below.
Structure (sections, animations, classNames) stays exactly as-is.

### 6.1 Display policy
- **Phone**: OMITTED on the public page (PDF can include).
- **GPA**: INCLUDED with framing for upward trajectory:
  - `GPA: 3.3 / 4.0`
  - `Most Recent Semester: 3.6 GPA (22 credits; advanced ORIE coursework including Optimization, Stochastic Models, and Machine Learning)`
- **M.Eng. "Intended" entry**: KEEP with its badge.
- **Projects on resume page**: OMITTED. Replace with a single CTA line below Skills: *"See full project case studies →"* linking to `/projects`.

### 6.2 Education
- **Cornell University, College of Engineering — Ithaca, NY**
  - B.S. Operations Research &amp; Information Engineering | Minor: Artificial Intelligence
  - Expected May 2027
  - `GPA: 3.3 / 4.0`
  - `Most Recent Semester: 3.6 GPA (22 credits; advanced ORIE coursework including Optimization, Stochastic Models, and Machine Learning)`
  - Relevant Coursework: Optimization Methods, Machine Learning &amp; Data Science, Stochastic Models, Engineering Applications of OR, Financial &amp; Managerial Accounting
- **Cornell University, College of Engineering — Ithaca, NY** *(Intended)*
  - M.Eng. Operations Research &amp; Information Engineering — Strategic Operations
  - Expected Dec 2027 (if accepted)

### 6.3 Work Experience

**American Electric Power (AEP) — Columbus, OH**
*Business Process Improvement Intern (Incoming)* · Summer 2026
- *No bullets yet — not started.*

**Secretariat International — El Segundo, CA**
*Construction Delay Consulting Intern* · Jun 2025 – Aug 2025
- Analyzed construction scheduling and cost data across large-scale projects to identify delays, cost drivers, and risk factors
- Built forecasting models and dashboards to assess timeline risk and financial exposure
- Synthesized complex datasets into structured insights supporting valuation analysis and expert reporting

**Student Agencies Inc. — Ithaca, NY**
*Logistics &amp; Operations Manager* · Feb 2024 – Aug 2024
- Led operations across 10+ national relocation projects, improving execution through workflow redesign and process standardization
- Managed logistics system handling 10,000+ inventory items and fulfillment for 1,000+ customers
- Directed an 80+ person team; implemented process improvements that contributed to a 10% increase in annual revenue

**MAC Power Washing — The Woodlands, TX**
*Co-Founder* · May 2023 – Aug 2023
- Built and operated a residential services business serving 30+ properties
- Developed pricing strategy that generated $8K+ in profit and improved service consistency

### 6.4 Leadership &amp; Activities

**Cornell Generative AI Club — Ithaca, NY**
*Head of Corporate Outreach* · Feb 2025 – Present
- Secure and manage partnerships with firms including Cisco, Investcorp, and early-stage startups
- Lead project execution and cross-functional coordination across AI initiatives

**Celsius — Ithaca, NY**
*Lead Student Marketing Ambassador* · Jul 2025 – Present
- Manage product inventory and distribution logistics, coordinating supply and fulfillment across 20+ campus organizations
- Lead campus marketing initiatives and sampling campaigns to drive engagement and brand presence

**Chi Psi Fraternity — Ithaca, NY**
*Lodge Manager &amp; Vice President* · Aug 2024 – May 2026
- Managed operations for a 13,000 sq ft residential lodge on 3.5 acres, overseeing facility maintenance, vendor contracts, and budgeting for 30 residents and 60+ members
- Planned and executed 4 large-scale formal events, managing logistics, vendor coordination, and budgets from concept through delivery
- Led chapter leadership as Vice President, overseeing organizational planning, member accountability, and cross-functional operations

**Cornell Men's Club Basketball — Ithaca, NY**
*Team Member* · Sep 2024 – Present

**Food Recovery Network — Ithaca, NY**
*Recovery Officer &amp; Driver* · Sep 2023 – Present

### 6.5 Skills &amp; Interests

Replace the current `grid sm:grid-cols-2` block with **five labeled groups stacked vertically**
inside the existing `border-l-2 border-crimson pl-6` rail. Each group: a mono label heading
(reuse the existing `font-mono text-sm font-semibold text-ink` class) and a body line in
`text-sm text-ink-muted`. No new components, no new styling, just five `<div>` blocks.

- **Languages &amp; Data** *(manual proficiency)*: Python · SQL · Excel (Advanced Modeling) · Tableau · Primavera P6 · Git
- **AI Engineering**: LLM APIs (Claude / OpenAI) · LangGraph · Multi-Agent Systems · Prompt Engineering · Agent Orchestration
- **AI-Assisted Development** *(via Claude Code, Cursor)*: TypeScript · React / Next.js · FastAPI · PostgreSQL
- **Analytics &amp; Methods**: Data Analysis · Optimization · Predictive Modeling · Statistical Analysis · Process Improvement · Workflow Automation
- **Interests**: AI in Finance · Off-Grid Hiking · Snowboarding · Basketball

### 6.6 Projects CTA + Contact (unchanged)

**Between** Skills (§6.5) and Contact, add a small CTA section using the same `section-label`
+ rail pattern as the other sections:

```
[section-label] Selected Work
                See full project case studies →
                (links to /projects, styled with .link-underline text-crimson)
```

Contact section (email · LinkedIn · GitHub · location line) stays exactly as it is. The
"Note: This is a public-facing resume…" privacy footnote at the bottom is **REMOVED** entirely
(per user, 2026-05-29) — the page implicitly omits phone / address without needing to state it.

## 7. Featured / sort behavior

- `getFeaturedProjects()` filters `featured: true` then slices to 3. With Roofing + PCCW +
  DB Migration set `featured: true` and Outreach `featured: false`, the homepage renders
  exactly those 3 (sorted by date desc: Roofing → DB Migration → PCCW).
- `getAllProjects()` is unchanged; Projects page renders all 4 (Roofing → Outreach → DB
  Migration → PCCW by date desc).

## 8. Branch &amp; commit strategy

- New branch off `main`: `feat/content-update-2026-05`
- Commits (per user's split-commits preference):
  1. `chore: remove three stale upcoming projects`
  2. `feat: add Route Optimization Engine project`
  3. `feat: add AI-Powered Outreach Engine project (in design)`
  4. `feat: mark PCCW + DB Migration as completed, refresh copy`
  5. `feat: add 'completed' and 'in-design' status badges to ProjectCard`
  6. `feat: refresh resume content (education, experience, leadership, skills)`
- Open PR against `main` for user review; no merge or deploy without explicit approval.

## 9. Out of scope

- Any frontend design / aesthetic / motion changes (per user, locked 2026-05-28)
- Resume PDF — user updates separately
- The Outreach tool itself — designed in a separate spun-off session
- Blog content
- Cover images for the two new projects (can be added later)
- SEO / metadata changes beyond what content edits naturally affect

## 10. Acceptance criteria

- `npm run build` and `npm run lint` pass.
- Local dev render visually identical to the live site except for: 4 projects (not 5), new badges
  on Completed / In Design, refreshed resume content.
- Homepage Selected Work shows exactly 3 cards: Roofing → DB Migration → PCCW.
- Projects page lists all 4 in this order: Roofing → Outreach → DB Migration → PCCW.
- Each project detail page renders its updated MDX correctly.
- Resume page reflects all §6 content; no phone visible; GPA + recent-semester line present;
  M.Eng. badge present; AEP shown with "Incoming" badge and no bullets; Celsius and Chi Psi
  bullets per §6.4; Skills section in the four-group + Interests layout; CTA links to
  `/projects`; the prior privacy footnote at the bottom is removed.
- TypeScript strict mode compiles; `status: "in-design"` recognized.
- No visual regressions on mobile or desktop versus the current live site (spot-check the
  exact same elements at 375 / 768 / 1024 / 1440 widths).

## 11. Open follow-ups (post-merge, not blocking)

- User finalizes the downloadable resume PDF with full projects and swaps `public/documents/resume.pdf`.
- Outreach project entry is upgraded from "In Design" once that ideation session produces real substance.
- Decide whether to add cover images for Roofing and Outreach (then `coverImage:` in frontmatter).
