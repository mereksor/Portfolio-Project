import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Merek Soriano, Cornell ORIE student. Education, experience, skills, and leadership.",
};

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 lg:px-10 py-20">
      <div className="animate-fade-up flex items-center justify-between">
        <div>
          <p className="section-label">Curriculum Vitae</p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Resume
          </h1>
        </div>
        <a
          href="/documents/resume.pdf"
          download
          className="bg-ink px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-crimson"
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
              GPA: 3.4 / 4.0
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              Most Recent Semester: 3.6 GPA (22 credits; advanced ORIE coursework including Optimization, Stochastic Models, and Machine Learning)
            </p>
            <p className="mt-1 text-sm text-ink-faint">
              Relevant Coursework: Optimization Methods, Machine Learning &amp; Data Science, Stochastic Models, Engineering Applications of OR, Financial &amp; Managerial Accounting
            </p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-ink">
              Cornell University, College of Engineering
              <span className="ml-2 inline-block rounded bg-crimson/10 px-2 py-0.5 text-xs font-medium text-crimson">
                Intended
              </span>
            </h3>
            <p className="font-mono text-sm text-ink-muted">
              Ithaca, NY &middot; Expected Dec 2027 (if accepted)
            </p>
            <p className="mt-1 text-sm text-ink-secondary">
              M.Eng. Operations Research &amp; Information Engineering, Strategic Operations
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="animate-fade-up stagger-2 mt-14">
        <p className="section-label">Work Experience</p>
        <div className="mt-4 space-y-8 border-l-2 border-crimson pl-6">
          {/* AEP: Upcoming */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Business Process Improvement Intern
                <span className="ml-2 inline-block rounded bg-crimson/10 px-2 py-0.5 text-xs font-medium text-crimson">
                  Upcoming
                </span>
              </h3>
              <span className="font-mono text-xs text-ink-faint">Summer 2026</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              American Electric Power (AEP) &middot; Columbus, OH
            </p>
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
            </ul>
          </div>

          {/* Student Agencies */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Logistics &amp; Operations Manager
              </h3>
              <span className="font-mono text-xs text-ink-faint">Feb 2024 &ndash; Aug 2024</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Student Agencies Inc. &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
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
            </ul>
          </div>

          {/* MAC Power Washing */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Co-Founder
              </h3>
              <span className="font-mono text-xs text-ink-faint">May 2023 &ndash; Aug 2023</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              MAC Power Washing &middot; The Woodlands, TX
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built and operated a residential services business serving 30+ properties</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Developed pricing strategy that generated $8K+ in profit and improved service consistency</span>
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
                Founding Member &amp; Head of Corporate Outreach
              </h3>
              <span className="font-mono text-xs text-ink-faint">Feb 2025 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Cornell Generative AI Club &middot; Ithaca, NY
            </p>
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Secure and manage partnerships with firms including Cisco, Investcorp, and early-stage startups</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Lead project execution and cross-functional coordination across AI initiatives</span>
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
          <a href="https://www.linkedin.com/in/merek-soriano-0ba570291" target="_blank" rel="noopener noreferrer" className="link-underline text-crimson">
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
