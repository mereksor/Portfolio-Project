import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const DUAL_PASS_DURATION = 330;
export const DUAL_PASS_SIZE = { width: 960, height: 540 };

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const display = "var(--font-newsreader), Georgia, serif";

type Verdict = "match" | "format" | "conflict";

interface Field {
  name: string;
  a: string;
  b: string;
  verdict: Verdict;
}

// Illustrative values only, not real vendor data.
const fields: Field[] = [
  { name: "PO number", a: "4500-0192", b: "4500-0192", verdict: "match" },
  { name: "Line", a: "1", b: "1", verdict: "match" },
  { name: "Committed date", a: "2026-08-04", b: "Aug 4, 2026", verdict: "format" },
  { name: "Requested date", a: "2026-07-28", b: "2026-07-21", verdict: "conflict" },
];

const verdictLabel: Record<Verdict, string> = {
  match: "Agree",
  format: "Format only",
  conflict: "Disagree",
};

const ease = Easing.inOut(Easing.cubic);

function stage(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

const ROW_TOP = 170;
const ROW_H = 58;

export function DualPassComposition() {
  const frame = useCurrentFrame();

  const docIn = stage(frame, 0, 25);
  const routeToReview = stage(frame, 250, 285);
  const tierIn = stage(frame, 285, 310);

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)", fontFamily: mono }}>
      <div style={{ position: "absolute", top: 34, left: 48, fontFamily: display, fontSize: 32, color: "var(--ink)" }}>
        Two passes, one document
      </div>

      {/* Source document */}
      <div
        style={{
          position: "absolute",
          left: 48,
          top: 110,
          width: 150,
          height: 200,
          borderRadius: 6,
          border: "1.5px solid var(--border-strong)",
          background: "var(--bg)",
          opacity: docIn,
          padding: 14,
        }}
      >
        <div style={{ fontSize: 12, color: "var(--ink-muted)", letterSpacing: 1.5 }}>VENDOR PDF</div>
        {Array.from({ length: 7 }, (_, i) => (
          <div
            key={i}
            style={{
              marginTop: 12,
              height: 6,
              width: `${60 + ((i * 37) % 40)}%`,
              borderRadius: 3,
              background: "var(--border-strong)",
            }}
          />
        ))}
      </div>

      {/* Column headers */}
      {[
        { label: "Pass A", x: 300, at: 30 },
        { label: "Pass B", x: 500, at: 40 },
        { label: "Compare", x: 700, at: 150 },
      ].map((h) => (
        <div
          key={h.label}
          style={{
            position: "absolute",
            left: h.x,
            top: 125,
            fontSize: 14,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: "var(--ink-muted)",
            opacity: stage(frame, h.at, h.at + 15),
          }}
        >
          {h.label}
        </div>
      ))}

      {fields.map((f, i) => {
        const top = ROW_TOP + i * ROW_H;
        const aIn = stage(frame, 45 + i * 12, 60 + i * 12);
        const bIn = stage(frame, 70 + i * 12, 85 + i * 12);
        const cmpIn = stage(frame, 160 + i * 18, 178 + i * 18);
        const color =
          f.verdict === "match" ? "var(--ink-muted)" : f.verdict === "format" ? "var(--ink)" : "var(--crimson)";
        const isConflict = f.verdict === "conflict";

        return (
          <div key={f.name}>
            <div style={{ position: "absolute", left: 220, top, fontSize: 12, color: "var(--ink-faint)", width: 70 }}>
              {f.name}
            </div>
            <div style={{ position: "absolute", left: 300, top, fontSize: 19, color: "var(--ink)", opacity: aIn }}>
              {f.a}
            </div>
            <div style={{ position: "absolute", left: 500, top, fontSize: 19, color: "var(--ink)", opacity: bIn }}>
              {f.b}
            </div>
            <div
              style={{
                position: "absolute",
                left: 700,
                top: top - 6,
                padding: "5px 12px",
                borderRadius: 999,
                fontSize: 15,
                color,
                border: `1.5px solid ${isConflict ? "var(--crimson)" : "var(--border-strong)"}`,
                background: isConflict ? "var(--crimson-wash)" : "transparent",
                opacity: cmpIn,
                transform: isConflict ? `translateY(${routeToReview * 134}px)` : undefined,
              }}
            >
              {verdictLabel[f.verdict]}
            </div>
          </div>
        );
      })}

      {/* Human review lane */}
      <div
        style={{
          position: "absolute",
          left: 660,
          top: 422,
          width: 250,
          height: 100,
          padding: "12px 16px",
          borderRadius: 8,
          border: "1.5px dashed var(--crimson)",
          opacity: stage(frame, 235, 255),
        }}
      >
        <div style={{ fontSize: 13, letterSpacing: 2, textTransform: "uppercase", color: "var(--crimson)" }}>
          Human review
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: 48,
          top: 440,
          width: 560,
          fontSize: 15,
          lineHeight: 1.6,
          color: "var(--ink-secondary)",
          opacity: tierIn,
        }}
      >
        Row confidence: <span style={{ color: "var(--crimson)" }}>Low</span>. Any real disagreement sends the
        row to a person instead of guessing.
      </div>
    </AbsoluteFill>
  );
}
