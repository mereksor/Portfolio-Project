import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Merek Soriano, Cornell ORIE student focused on applied AI and forward deployed engineering. Education, experience, skills, and leadership.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-20 sm:px-6 lg:px-10">
      <div className="animate-fade-up flex items-center justify-between">
        <div>
          <p className="section-index"><b>CV</b> / Curriculum Vitae</p>
          <h1 className="mt-3 font-display text-5xl font-normal tracking-tight text-ink sm:text-6xl">
            Resume
          </h1>
        </div>
        <a
          href="/documents/resume.pdf"
          download
          className="shrink-0 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-on-ink transition-all duration-200 hover:bg-crimson"
        >
          Download PDF
        </a>
      </div>

      {/* Education */}
      <section className="animate-fade-up stagger-1 mt-14">
        <p className="section-label">Education</p>
        <div className="mt-4 space-y-6 border-l-2 border-crimson pl-6">
          <div>
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
              Most Recent Semester: 22 credits of advanced ORIE coursework, including Optimization, Stochastic Models, and Machine Learning
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              Relevant Coursework: Optimization Methods, Machine Learning &amp; Data Science, Stochastic Models, Engineering Applications of OR, Financial &amp; Managerial Accounting
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink">
              Cornell University, College of Engineering
              <span className="ml-2 inline-block rounded bg-crimson/10 px-2 py-0.5 text-xs font-medium text-crimson">
                Admitted
              </span>
            </h3>
            <p className="font-mono text-sm text-ink-muted">
              Ithaca, NY &middot; Spring 2027 &ndash; December 2027
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              M.Eng. Data Analytics
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              Spring 2027 hybrid semester alongside the B.S.; M.Eng. project anticipated in 2027, topic to be announced
            </p>
          </div>
        </div>
      </section>

      {/* Current */}
      <section className="animate-fade-up stagger-2 mt-14">
        <p className="section-label">Current</p>
        <div className="mt-4 space-y-8 border-l-2 border-crimson pl-6">
          {/* TODO(merek): confirm CCR name, dates, client examples */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                AI Automation Contractor
              </h3>
              <span className="font-mono text-xs text-ink-faint">2026 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">CCR &middot; Contract</p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Build business automations for clients, connecting existing tools with Python integrations</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Develop custom software where off-the-shelf tools do not fit the workflow</span>
              </li>
            </ul>
          </div>
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                M.Eng. Project
                <span className="ml-2 inline-block rounded border border-dashed border-border-strong px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider text-ink-muted">
                  Anticipated
                </span>
              </h3>
              <span className="font-mono text-xs text-ink-faint">2027</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Cornell University &middot; M.Eng. Data Analytics
            </p>
            <p className="mt-2 text-sm text-ink-muted">Topic to be announced.</p>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="animate-fade-up stagger-2 mt-14">
        <p className="section-label">Work Experience</p>
        <div className="mt-4 space-y-8 border-l-2 border-crimson pl-6">
          {/* AEP */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Business Process Improvement and AI Intern
              </h3>
              <span className="font-mono text-xs text-ink-faint">Jun 2026 &ndash; Aug 2026</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              American Electric Power (AEP) &middot; Columbus, OH
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built internal AI automation tools, a Python library and repeatable scripts, as one of a limited group granted early API access; adopted by other projects and projected to save multiple full-time employees of labor</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built AI document intelligence pipelines, including an embedding and clustering pipeline that turned ~2,000 construction change orders into 10 actionable process improvement themes</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Directed a robotics-initiative feasibility study for a Vice President-level executive driving enterprise-wide robotics strategy, integrating industry research and subject matter expert input; defined and tracked viability metrics</span>
              </li>
            </ul>
          </div>

          {/* Secretariat */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Construction Delay Consulting Intern
              </h3>
              <span className="font-mono text-xs text-ink-faint">Jun 2025 &ndash; Aug 2025</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Secretariat International &middot; El Segundo, CA
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built data engineering workflows to extract and integrate project data from multiple sources, building analytical frameworks to support expert testimony and mediation proceedings</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Conducted critical path and delay analysis across 4 multi-million-dollar construction projects using Primavera P6, quantifying timeline impacts to support data-informed settlement valuations</span>
              </li>
            </ul>
          </div>

          {/* Student Agencies */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Operations Manager
              </h3>
              <span className="font-mono text-xs text-ink-faint">Feb 2024 &ndash; Aug 2024</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Student Agencies Inc. &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Designed and launched a Salesforce-based billing and logistics platform serving 1,000+ customers across two warehouses, gathering requirements and engineering automated workflows</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Implemented algorithmic route optimization and scheduling, achieving 100% on-time delivery across 10+ concurrent relocation projects</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Led cross-functional operations for 80+ staff, scaling revenue to $375K annually with 10% YoY growth</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership & Activities */}
      <section className="animate-fade-up stagger-3 mt-14">
        <p className="section-label">Leadership &amp; Activities</p>
        <div className="mt-4 space-y-6 border-l-2 border-crimson pl-6">
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Founding Head of Corporate Partnerships
              </h3>
              <span className="font-mono text-xs text-ink-faint">Feb 2025 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Cornell Generative AI Club &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Led AI-driven product and design projects with partners including Cisco, Investcorp, and fintech startups, from client discovery to deployment</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Secure and manage partnerships with 10+ firms, coordinating cross-functional teams across AI initiatives</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Lead Student Marketing Ambassador
              </h3>
              <span className="font-mono text-xs text-ink-faint">Jul 2025 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Celsius &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Manage product inventory and distribution logistics, coordinating supply and fulfillment across 20+ campus organizations</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Lead campus marketing initiatives and sampling campaigns to drive engagement and brand presence</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Team Member
              </h3>
              <span className="font-mono text-xs text-ink-faint">Sep 2024 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Cornell Men&apos;s Club Basketball &middot; Ithaca, NY
            </p>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Recovery Officer &amp; Driver
              </h3>
              <span className="font-mono text-xs text-ink-faint">Sep 2023 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Food Recovery Network &middot; Ithaca, NY
            </p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="animate-fade-up stagger-4 mt-14">
        <p className="section-label">Skills &amp; Interests</p>
        <div className="mt-4 space-y-5 border-l-2 border-crimson pl-6">
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">AI Engineering</h3>
            <p className="mt-1 text-sm text-ink-muted">
              LLM APIs (Claude / OpenAI) &middot; RAG &middot; LangGraph &middot; Multi-Agent Systems &middot; Agent Orchestration &middot; Workflow Automation
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">
              Languages &amp; Data <span className="text-ink-faint font-normal">(manual proficiency)</span>
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              Python &middot; SQL &middot; Excel (Advanced Modeling) &middot; Tableau &middot; Primavera P6 &middot; Git
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">
              AI-Assisted Development <span className="text-ink-faint font-normal">(via Claude Code, Cursor)</span>
            </h3>
            <p className="mt-1 text-sm text-ink-muted">
              TypeScript &middot; React / Next.js &middot; FastAPI &middot; PostgreSQL &middot; Docker &middot; GitHub Actions
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
              Applied AI in Operations &middot; Off-Grid Hiking &middot; Snowboarding &middot; Basketball
            </p>
          </div>
        </div>
      </section>

      {/* Selected Work CTA: links to the dedicated Projects section */}
      <section className="animate-fade-up stagger-5 mt-14">
        <p className="section-label">Selected Work</p>
        <div className="mt-4 border-l-2 border-crimson pl-6">
          <Link href="/projects" className="link-underline text-sm font-medium text-crimson">
            See full project case studies &rarr;
          </Link>
        </div>
      </section>

      {/* Contact: professional info only per NFR-12 */}
      <section className="animate-fade-up stagger-6 mt-14">
        <p className="section-label">Contact</p>
        <div className="mt-4 flex flex-wrap gap-6 text-sm border-l-2 border-crimson pl-6">
          <a href="mailto:mks258@cornell.edu" className="link-underline text-crimson">
            mks258@cornell.edu
          </a>
          <a href="https://www.linkedin.com/in/merek-soriano" target="_blank" rel="noopener noreferrer" className="link-underline text-crimson">
            LinkedIn
          </a>
          <a href="https://github.com/mereksor" target="_blank" rel="noopener noreferrer" className="link-underline text-crimson">
            GitHub
          </a>
          <span className="text-ink-faint">
            The Woodlands, TX &middot; Ithaca, NY
          </span>
        </div>
      </section>
    </div>
  );
}
