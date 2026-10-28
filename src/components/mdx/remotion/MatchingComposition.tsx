import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const MATCHING_DURATION = 360;
export const MATCHING_SIZE = { width: 960, height: 540 };

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const display = "var(--font-newsreader), Georgia, serif";

// Illustrative cohort: 8 mentees, 4 mentors with 2 seats each. Mentor 0 is the popular one.
const MENTEE_X = 200;
const MENTOR_X = 760;
const menteeOptions = [5, 1, 3, 2, 4, 2, 5, 3];
// Matching order is fewest compatible options first; each entry is [mentee index, mentor index].
const assignments: [number, number][] = [
  [1, 1],
  [3, 0],
  [5, 2],
  [2, 1],
  [7, 3],
  [4, 2],
  [6, 3],
  [0, 0],
];
const RESERVED_ASSIGNMENT = 7;
const mentorNames = ["Popular", "Mentor B", "Mentor C", "Mentor D"];

const ease = Easing.inOut(Easing.cubic);

function stage(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

const sortedOrder = assignments.map(([mentee]) => mentee);

function menteeY(index: number, sorted: number) {
  const unsortedY = 160 + index * 46;
  const sortedY = 160 + sortedOrder.indexOf(index) * 46;
  return interpolate(sorted, [0, 1], [unsortedY, sortedY]);
}

function mentorY(index: number) {
  return 180 + index * 92;
}

const captions = [
  { at: 0, text: "Every pair gets a compatibility score" },
  { at: 70, text: "Hardest-to-place mentees go first" },
  { at: 130, text: "The popular mentor holds a seat back" },
  { at: 290, text: "Held seat goes to a later mentee" },
];

const MATCH_START = 140;
const MATCH_STEP = 20;

export function MatchingComposition() {
  const frame = useCurrentFrame();
  const scoresIn = stage(frame, 10, 50);
  const sorted = stage(frame, 75, 115);
  const scoresOut = stage(frame, 115, 135);

  const caption = [...captions].reverse().find((c) => frame >= c.at) ?? captions[0];
  const captionOpacity = interpolate(frame - caption.at, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)", fontFamily: mono }}>
      <div style={{ position: "absolute", top: 32, left: 48, fontFamily: display, fontSize: 32, color: "var(--ink)", opacity: captionOpacity }}>
        {caption.text}
      </div>
      <div style={{ position: "absolute", top: 108, left: MENTEE_X - 120, fontSize: 13, letterSpacing: 2, color: "var(--ink-faint)" }}>
        MENTEES (OPTIONS)
      </div>
      <div style={{ position: "absolute", top: 108, left: MENTOR_X - 14, fontSize: 13, letterSpacing: 2, color: "var(--ink-faint)" }}>
        MENTORS (2 SEATS)
      </div>

      <svg width={960} height={540} style={{ position: "absolute", inset: 0 }}>
        {/* Faint all-pairs compatibility lines */}
        {menteeOptions.map((_, m) =>
          mentorNames.map((__, t) => (
            <line
              key={`${m}-${t}`}
              x1={MENTEE_X + 14}
              y1={menteeY(m, sorted)}
              x2={MENTOR_X - 14}
              y2={mentorY(t)}
              stroke="var(--border-strong)"
              strokeWidth={1}
              opacity={scoresIn * (1 - scoresOut) * 0.8}
            />
          ))
        )}
        {/* Matches drawn in priority order */}
        {assignments.map(([m, t], i) => {
          const start = i === RESERVED_ASSIGNMENT ? 300 : MATCH_START + i * MATCH_STEP;
          const p = stage(frame, start, start + 16);
          const x1 = MENTEE_X + 14;
          const y1 = menteeY(m, sorted);
          const x2 = MENTOR_X - 14;
          const y2 = mentorY(t);
          return (
            <line
              key={`a${i}`}
              x1={x1}
              y1={y1}
              x2={x1 + (x2 - x1) * p}
              y2={y1 + (y2 - y1) * p}
              stroke={t === 0 ? "var(--crimson)" : "var(--ink-secondary)"}
              strokeWidth={2.5}
              opacity={p > 0 ? 1 : 0}
            />
          );
        })}
      </svg>

      {menteeOptions.map((options, m) => {
        const y = menteeY(m, sorted);
        return (
          <div key={m}>
            <div
              style={{
                position: "absolute",
                left: MENTEE_X - 14,
                top: y - 14,
                width: 28,
                height: 28,
                borderRadius: 999,
                background: "var(--bg)",
                border: "2px solid var(--ink-secondary)",
              }}
            />
            <div style={{ position: "absolute", left: MENTEE_X - 64, top: y - 10, fontSize: 16, color: "var(--ink-muted)", width: 30, textAlign: "right" }}>
              {options}
            </div>
          </div>
        );
      })}

      {mentorNames.map((name, t) => {
        const y = mentorY(t);
        const filled = assignments.filter(([, mt], i) => {
          const start = i === RESERVED_ASSIGNMENT ? 300 : MATCH_START + i * MATCH_STEP;
          return mt === t && frame >= start + 16;
        }).length;
        const reserved = t === 0 && frame >= 130 && frame < 300;
        return (
          <div key={name}>
            <div
              style={{
                position: "absolute",
                left: MENTOR_X - 14,
                top: y - 14,
                width: 28,
                height: 28,
                borderRadius: 6,
                background: t === 0 ? "var(--crimson)" : "var(--ink-secondary)",
              }}
            />
            <div style={{ position: "absolute", left: MENTOR_X + 26, top: y - 22, fontSize: 15, color: "var(--ink)" }}>{name}</div>
            <div style={{ position: "absolute", left: MENTOR_X + 26, top: y + 2, display: "flex", gap: 6 }}>
              {[0, 1].map((seat) => {
                const isFilled = seat < filled;
                const isHeld = reserved && seat === 1 && !isFilled;
                return (
                  <div
                    key={seat}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: 3,
                      background: isFilled ? (t === 0 ? "var(--crimson)" : "var(--ink-secondary)") : "transparent",
                      border: isHeld ? "1.5px dashed var(--crimson)" : "1.5px solid var(--border-strong)",
                    }}
                  />
                );
              })}
              {reserved && filled < 2 && (
                <span style={{ fontSize: 12, color: "var(--crimson)", marginLeft: 4 }}>held</span>
              )}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
