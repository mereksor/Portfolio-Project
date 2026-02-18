import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume of Merek Soriano — Cornell ORIE student. Education, experience, skills, and leadership.",
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
            <p className="mt-1 text-sm text-ink-faint">
              Relevant Coursework: Practical Tools for OR (ML &amp; Data Science), Engineering Applications of OR,
              Financial &amp; Managerial Accounting, Data Analytics for Information Science
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
              M.Eng. Operations Research &amp; Information Engineering — Strategic Operations
            </p>
          </div>
        </div>
      </section>

      {/* Work Experience */}
      <section className="animate-fade-up stagger-2 mt-14">
        <p className="section-label">Work Experience</p>
        <div className="mt-4 space-y-8 border-l-2 border-crimson pl-6">
          {/* AEP — Upcoming */}
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
            <ul className="mt-2 space-y-1.5 text-sm text-ink-muted">
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Planning to focus on datacenter infrastructure and finance within AEP&apos;s business process improvement division</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Will apply operations research and data analytics to optimize enterprise workflows and operational efficiency</span>
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
                <span>Conducted quantitative analyses on scheduling and cost data across large construction projects to identify trends and improve reporting accuracy</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Developed Excel-based forecasting tools and visual dashboards to evaluate project performance and financial efficiency</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Managed large datasets and complex project timelines to enhance analytical accuracy and support valuation-related insights and expert reports</span>
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
                <span>Optimized service workflows for 10+ national relocation projects, improving user experience through process redesign and communication efficiency</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Coordinated a warehouse management operation processing over 10,000 inventory items and serving 1,000+ customers through efficient shipping and fulfillment</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Led an 80+ person team, applying user-centered process improvements that increased annual revenue by 10%</span>
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
                <span>Oversaw operations for 30+ properties and generated $8K+ in profit through pricing optimization</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Implemented feedback and tracking systems to improve customer satisfaction</span>
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
                <span>Pitched, secured, and overseen all club projects, landing corporate clients including Cisco, Investcorp, and several early-stage startups</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Run end-to-end club operations and administration including recruitment, project management, corporate outreach, and cross-functional coordination</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Built project frameworks for ideation, prototyping, and design evaluation using design thinking and collaborative planning</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Actively developing technical skills in AI/ML development and exploring industry applications alongside partnership responsibilities</span>
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
                <span>Lead campus marketing ambassador for Celsius, engaging with 20+ on-campus organizations to build brand presence and drive product awareness</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Plan and execute promotional events, sampling campaigns, and partnerships with student groups to grow market share within the Cornell community</span>
              </li>
              <li className="flex gap-2">
                <span className="mt-1.5 text-crimson">&bull;</span>
                <span>Develop creative marketing strategies to connect with diverse student audiences across athletics, Greek life, and academic organizations</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="font-display font-semibold text-ink">
                Vice President
              </h3>
              <span className="font-mono text-xs text-ink-faint">Jan 2024 &ndash; Present</span>
            </div>
            <p className="font-mono text-sm text-ink-muted">
              Chi Psi Fraternity &middot; Ithaca, NY
            </p>
            <p className="mt-1 text-xs text-ink-faint italic">
              Former Property Manager
            </p>
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
        <div className="mt-4 grid gap-5 sm:grid-cols-2 border-l-2 border-crimson pl-6">
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">Technical Skills</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Python, SQL, Excel (Modeling &amp; Forecasting), Tableau, Primavera P6, Data Visualization, Predictive Analytics, AI Tools, Workflow Optimization
            </p>
          </div>
          <div>
            <h3 className="font-mono text-sm font-semibold text-ink">Interests</h3>
            <p className="mt-1 text-sm text-ink-muted">
              Financial Applications of AI, International Travel, Snowboarding, Basketball
            </p>
          </div>
        </div>
      </section>

      {/* Contact — professional info only per NFR-12 */}
      <section className="animate-fade-up stagger-5 mt-14">
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

      <p className="mt-14 text-xs text-ink-faint">
        Note: This is a public-facing resume. Home address and phone number are
        intentionally omitted for privacy. Contact me via email or LinkedIn for
        full details.
      </p>
    </div>
  );
}
