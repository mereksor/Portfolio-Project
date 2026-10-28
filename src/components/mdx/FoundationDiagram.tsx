import Link from "next/link";

const base = "/projects/aep-internship";

// The client library is the shared layer; the two build deep dives sit on it, so the
// diagram stacks them above it rather than drawing a flowchart.
export default function FoundationDiagram() {
  return (
    <figure className="not-prose my-8">
      <div className="frame-corners relative rounded-lg border border-border bg-bg-elevated p-5 sm:p-8">
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href={`${base}/pattern-mining`}
            className="card-hover rounded-md border border-border-strong bg-bg p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Build</p>
            <p className="mt-1 font-display text-lg text-ink">Change order pattern mining</p>
            <p className="mt-1 text-xs text-ink-muted">~2,500 documents to 10 themes</p>
          </Link>
          <Link
            href={`${base}/dual-pass-extraction`}
            className="card-hover rounded-md border border-border-strong bg-bg p-4"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">Build</p>
            <p className="mt-1 font-display text-lg text-ink">Dual-pass document extraction</p>
            <p className="mt-1 text-xs text-ink-muted">Two passes, disagreement flags errors</p>
          </Link>
        </div>
        <div aria-hidden className="mx-auto my-3 grid w-full grid-cols-2 sm:my-4">
          <span className="mx-auto h-6 w-px bg-crimson" />
          <span className="mx-auto h-6 w-px bg-crimson" />
        </div>
        <div className="rounded-md bg-ink p-4 text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-ink opacity-70">Foundation</p>
          <p className="mt-1 font-display text-lg text-on-ink">Zero-setup LLM client library</p>
          <p className="mt-1 text-xs text-on-ink opacity-70">Two lines of Python to reach the internal LLM gateway</p>
        </div>
      </div>
      <figcaption className="mt-3 font-mono text-[11px] text-ink-faint">
        Both build projects ran on the same client library.
      </figcaption>
    </figure>
  );
}
