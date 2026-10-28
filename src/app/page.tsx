import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content";
import ProjectRow from "@/components/ProjectRow";
import ScrollReveal from "@/components/ScrollReveal";
import MagneticButton from "@/components/MagneticButton";
import SignalField from "@/components/SignalField";
import KineticHeading from "@/components/KineticHeading";
import RotatingWord from "@/components/RotatingWord";

interface NowItem {
  tag: "Now" | "Next";
  status: string;
  title: string;
  org: string;
  dates: string;
  body: string;
  points: string[];
}

const nowItems: NowItem[] = [
  // TODO(merek): confirm CCR name, dates, client examples
  {
    tag: "Now",
    status: "Active",
    title: "AI Automation Contracts",
    org: "CCR",
    dates: "2026 - Present",
    body: "Contract work building business automations for clients: Python integrations between the tools a team already uses, plus custom software where off-the-shelf tools fall short.",
    points: ["Python integrations", "Custom internal tools", "Workflow automation"],
  },
  {
    tag: "Next",
    status: "Anticipated",
    title: "M.Eng. Project",
    org: "Cornell University",
    dates: "Spring 2027 - December 2027",
    body: "Master of Engineering in Data Analytics, starting Spring 2027 alongside the final B.S. semester. The M.Eng. project is anticipated for 2027, topic to be announced.",
    points: ["Data Analytics", "Admitted", "Topic TBD"],
  },
];

interface LogEntry {
  when: string;
  what: string;
}

const log: LogEntry[] = [
  { when: "Spring 2027", what: "M.Eng. in Data Analytics begins (anticipated)" },
  { when: "2026", what: "AI automation contract work at CCR" },
  { when: "Sep 2026", what: "ALICE wins Best Design at DN Hacks, Washington, DC" },
  { when: "Jun - Aug 2026", what: "Business Process Improvement and AI Intern, American Electric Power" },
];

const specs = [
  { k: "School", v: "Cornell ORIE, May 2027" },
  { k: "Graduate", v: "M.Eng., Dec 2027" },
  { k: "Minor", v: "Artificial Intelligence" },
  { k: "Based", v: "Ithaca, NY" },
];

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="relative isolate overflow-hidden border-b border-border">
        <div className="dot-grid absolute inset-0 -z-20" aria-hidden="true" />
        <SignalField className="absolute inset-0 -z-10 opacity-90" />
        <div
          className="signal-glow absolute -right-24 top-10 -z-10 h-[420px] w-[420px] opacity-70"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 sm:px-6 sm:pb-28 sm:pt-28 lg:px-10">
          <div className="animate-fade-up inline-flex items-center gap-3 rounded-full border border-border bg-bg/70 px-3.5 py-1.5 backdrop-blur">
            <span className="pulse-dot" aria-hidden="true" />
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">
              Seeking Summer 2027 Forward Deployed and Applied AI Engineer internships
            </span>
          </div>

          <KineticHeading
            text="Merek Soriano"
            className="mt-8 font-display text-[clamp(3rem,11vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.03em] text-ink"
          />

          <p className="animate-fade-up stagger-4 mt-8 max-w-2xl text-lg leading-relaxed text-ink-secondary sm:text-xl">
            Cornell Operations Research and Information Engineering, starting an M.Eng. in
            Data Analytics in Spring 2027. Building real systems with{" "}
            {/* Last in the paragraph so the word's changing width never reflows other text. */}
            <RotatingWord
              words={["optimization", "AI agents", "automation", "analytics"]}
              className="font-display italic text-crimson"
            />
          </p>

          <div className="animate-fade-up stagger-5 mt-10 flex flex-wrap items-center gap-5">
            <MagneticButton href="/projects" className="cursor-pointer">
              <span className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-on-ink transition-colors duration-200 hover:bg-crimson">
                View projects
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </MagneticButton>
            <Link
              href="/resume"
              className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
            >
              Resume
            </Link>
            <a
              href="mailto:mks258@cornell.edu"
              className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
            >
              Email
            </a>
          </div>

          <dl className="animate-fade-up stagger-6 mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
            {specs.map((s) => (
              <div key={s.k} className="bg-bg/85 px-4 py-3 backdrop-blur">
                <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-faint">{s.k}</dt>
                <dd className="mt-1 text-sm text-ink">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 sm:px-6 lg:px-10">
        {/* Now */}
        <section id="now" className="scroll-mt-20 py-24">
          <ScrollReveal>
            <p className="section-index">
              <b>01</b> / Now
            </p>
            <h2 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
              Current work
            </h2>
          </ScrollReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {nowItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i + 1}>
                <article className="frame-corners card-hover h-full rounded-sm border border-border bg-bg-elevated p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-faint">
                      {item.tag} / {item.dates}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                        item.tag === "Now"
                          ? "border-crimson/30 text-crimson"
                          : "border-dashed border-border-strong text-ink-muted"
                      }`}
                    >
                      {item.tag === "Now" && <span className="pulse-dot" aria-hidden="true" />}
                      {item.status}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-3xl font-normal tracking-tight text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-ink-muted">{item.org}</p>
                  <p className="mt-5 text-[15px] leading-relaxed text-ink-secondary">{item.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {item.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-tag-border bg-tag-bg px-2.5 py-1 font-mono text-[10px] text-tag-text"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={2}>
            <ol className="mt-12 border-t border-border">
              {log.map((entry) => (
                <li
                  key={entry.what}
                  className="grid grid-cols-1 gap-1 border-b border-border py-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
                    {entry.when}
                  </span>
                  <span className="text-[15px] text-ink-secondary">{entry.what}</span>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </section>

        {/* Selected work */}
        <section className="border-t border-border py-24">
          <ScrollReveal>
            <div className="flex items-end justify-between gap-6">
              <div>
                <p className="section-index">
                  <b>02</b> / Work
                </p>
                <h2 className="mt-3 font-display text-4xl font-normal tracking-tight text-ink sm:text-5xl">
                  Selected projects
                </h2>
              </div>
              <Link
                href="/projects"
                className="link-underline shrink-0 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint transition-colors hover:text-ink"
              >
                All projects
              </Link>
            </div>
          </ScrollReveal>

          <div className="mt-12 border-b border-border">
            {featuredProjects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={Math.min(i + 1, 5)}>
                <ProjectRow project={project} index={i} />
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-border py-24 sm:py-32">
          <ScrollReveal>
            <p className="section-index">
              <b>03</b> / Contact
            </p>
            <p className="mt-6 max-w-3xl font-display text-3xl font-normal leading-tight tracking-tight text-ink sm:text-5xl">
              Working on a problem that needs optimization or AI in production?{" "}
              <span className="italic text-crimson">Let&apos;s connect.</span>
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <a
                href="mailto:mks258@cornell.edu"
                className="inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-on-ink transition-colors duration-200 hover:bg-crimson"
              >
                mks258@cornell.edu
              </a>
              <a
                href="https://www.linkedin.com/in/merek-soriano-0ba570291"
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline font-mono text-xs uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
              >
                LinkedIn
              </a>
            </div>
          </ScrollReveal>
        </section>
      </div>
    </>
  );
}
