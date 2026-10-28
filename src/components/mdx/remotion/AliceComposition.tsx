import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ALICE_DURATION = 480;
export const ALICE_SIZE = { width: 960, height: 540 };

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const display = "var(--font-newsreader), Georgia, serif";
const ease = Easing.inOut(Easing.cubic);

function stage(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

// Timeline of the DN Hacks 2026 demo, in frames at 30fps.
const CUT = 100;
const STEP_STARTS = [150, 195, 240];
const CUT_REQ = 290;
const SCAN = 335;
const SIGN = 375;
const REJECT = 400;
const OUTRO = 430;

interface Request {
  start: number;
  label: string;
  score: number;
  high: boolean;
  // Frame the card leaves the lane and drops into the ledger.
  exit: number;
}

const requests: Request[] = [
  ...STEP_STARTS.map((start) => ({ start, label: "Step up fan speed", score: 0.18, high: false, exit: start + 34 })),
  { start: CUT_REQ, label: "Cut all cooling", score: 0.92, high: true, exit: REJECT + 6 },
];

interface LedgerEvent {
  at: number;
  label: string;
  accent: boolean;
}

const ledger: LedgerEvent[] = [
  { at: 70, label: "receipt", accent: false },
  ...STEP_STARTS.map((s) => ({ at: s + 40, label: "allow", accent: false })),
  { at: CUT_REQ + 30, label: "hold", accent: true },
  { at: REJECT + 12, label: "reject", accent: true },
];

const captions = [
  { at: 0, text: "Connected: every request verified upstream" },
  { at: CUT, text: "Network lost: authority moves to the edge" },
  { at: STEP_STARTS[0], text: "Normal step-ups score low and run" },
  { at: CUT_REQ, text: "A full cooling cut scores high and is held" },
  { at: SCAN, text: "Technician verifies their face and signs a rejection" },
  { at: OUTRO, text: "The fan never changes" },
];

// Fan speed rises smoothly after each allowed step-up and is untouched by the rejected cut.
function fanLevel(frame: number) {
  return STEP_STARTS.reduce((sum, s) => sum + stage(frame, s + 22, s + 42), 0);
}

function fanAngle(frame: number) {
  let angle = 0;
  for (let f = 0; f < frame; f++) angle += 3 + fanLevel(f) * 4;
  return angle;
}

const card: CSSProperties = {
  position: "absolute",
  borderRadius: 10,
  border: "1.5px solid var(--border-strong)",
  background: "var(--bg)",
  color: "var(--ink)",
};

const NODE_Y = 112;
const LANE_X = 360;
const LANE_Y = 250;

export function AliceComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (start: number) => spring({ frame: frame - start, fps, config: { damping: 200 } });

  const linkCut = stage(frame, CUT, CUT + 24);
  const edgeAuthority = stage(frame, CUT + 6, CUT + 26);
  const level = fanLevel(frame);
  const angle = fanAngle(frame);

  // Flowing dashes on the live link; they stop once the link is cut.
  const dashOffset = -frame * 1.6;

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)", fontFamily: mono }}>
      {captions.map((c, i) => {
        const next = captions[i + 1]?.at;
        const fadeOut = next === undefined ? 0 : stage(frame, next - 2, next + 10);
        const opacity = stage(frame, c.at, c.at + 14) * (1 - fadeOut);
        const y = interpolate(stage(frame, c.at, c.at + 14), [0, 1], [8, 0]);
        return (
          <div
            key={c.text}
            style={{
              position: "absolute",
              top: 30,
              left: 48,
              fontFamily: display,
              fontSize: 30,
              color: "var(--ink)",
              opacity,
              transform: `translateY(${y}px)`,
            }}
          >
            {c.text}
          </div>
        );
      })}

      {/* Topology */}
      <svg width={960} height={540} style={{ position: "absolute", inset: 0 }}>
        <line x1={198} y1={NODE_Y + 22} x2={262} y2={NODE_Y + 22} stroke="var(--border-strong)" strokeWidth={2} strokeDasharray="6 6" strokeDashoffset={dashOffset} />
        {/* The edge link retracts toward both ends when the router is unplugged. */}
        <line
          x1={462}
          y1={NODE_Y + 22}
          x2={462 + 88 * (1 - linkCut) * 0.5}
          y2={NODE_Y + 22}
          stroke="var(--border-strong)"
          strokeWidth={2}
          strokeDasharray="6 6"
          strokeDashoffset={dashOffset}
        />
        <line
          x1={550 - 88 * (1 - linkCut) * 0.5}
          y1={NODE_Y + 22}
          x2={550}
          y2={NODE_Y + 22}
          stroke="var(--border-strong)"
          strokeWidth={2}
          strokeDasharray="6 6"
          strokeDashoffset={dashOffset}
        />
      </svg>

      {/* Packets travel the connected path twice before the cut. */}
      {[18, 48].map((start) => {
        const t = stage(frame, start, start + 34);
        const x = interpolate(t, [0, 0.45, 0.55, 1], [198, 262, 462, 550]);
        return (
          <div
            key={start}
            style={{
              position: "absolute",
              left: x - 6,
              top: NODE_Y + 16,
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "var(--crimson)",
              opacity: t > 0 && t < 1 ? 1 : 0,
            }}
          />
        );
      })}

      <div style={{ ...card, left: 48, top: NODE_Y, width: 150, padding: "12px 14px", fontSize: 14 }}>Cloud agent</div>
      <div style={{ ...card, left: 262, top: NODE_Y, width: 200, padding: "12px 14px", fontSize: 14 }}>Enterprise + SIEM</div>
      <div
        style={{
          ...card,
          left: 550,
          top: NODE_Y,
          width: 210,
          padding: "12px 14px",
          fontSize: 14,
          borderColor: edgeAuthority > 0.5 ? "var(--crimson)" : "var(--border-strong)",
          boxShadow: `0 0 0 ${edgeAuthority * 4}px var(--crimson-wash)`,
        }}
      >
        Edge Pi
        <div style={{ position: "relative", height: 16, marginTop: 4, fontSize: 11, letterSpacing: 1 }}>
          <span style={{ position: "absolute", color: "var(--ink-faint)", opacity: 1 - edgeAuthority }}>AUTHORITY: ENTERPRISE</span>
          <span style={{ position: "absolute", color: "var(--crimson)", opacity: edgeAuthority }}>AUTHORITY: LOCAL</span>
        </div>
      </div>

      {/* Request lane */}
      <div style={{ position: "absolute", left: LANE_X, top: LANE_Y - 26, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)", opacity: stage(frame, CUT + 30, CUT + 45) }}>
        LOCAL AGENT REQUEST
      </div>
      {requests.map((r) => {
        const enter = pop(r.start);
        const leave = stage(frame, r.exit, r.exit + 16);
        if (frame < r.start || leave >= 1) return null;
        const scoreFill = stage(frame, r.start + 8, r.start + 22);
        const verdictIn = stage(frame, r.start + 20, r.start + 28);
        const held = r.high && frame >= r.start + 28 && frame < REJECT;
        const rejected = r.high && frame >= REJECT;
        const pulse = held ? 0.5 + 0.5 * Math.sin((frame - r.start) / 5) : 0;
        const verdict = r.high ? (rejected ? "rejected" : "held") : "allowed";
        return (
          <div
            key={r.start}
            style={{
              ...card,
              left: LANE_X,
              top: LANE_Y,
              width: 330,
              padding: "14px 16px",
              opacity: enter * (1 - leave),
              transform: `translateY(${(1 - enter) * 24 + leave * 120}px) scale(${1 - leave * 0.15})`,
              borderColor: r.high ? "var(--crimson)" : "var(--border-strong)",
              boxShadow: held ? `0 0 0 ${2 + pulse * 5}px var(--crimson-glow)` : undefined,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 15 }}>
              <span>{r.label}</span>
              <span style={{ color: r.high ? "var(--crimson)" : "var(--ink-muted)", opacity: verdictIn }}>{verdict}</span>
            </div>
            <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: "var(--ink-faint)" }}>
              <span>ANOMALY</span>
              <div style={{ flex: 1, height: 6, borderRadius: 3, background: "var(--bg-muted)", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${r.score * scoreFill * 100}%`,
                    height: "100%",
                    borderRadius: 3,
                    background: r.high ? "var(--crimson)" : "var(--ink-muted)",
                  }}
                />
              </div>
              <span style={{ opacity: verdictIn }}>{r.high ? "high" : "low"}</span>
            </div>
          </div>
        );
      })}

      {/* Technician verification */}
      {(() => {
        const enter = pop(SCAN - 6);
        const leave = stage(frame, OUTRO + 10, OUTRO + 30);
        const scan = stage(frame, SCAN + 6, SIGN - 6);
        const verified = frame >= SIGN - 6;
        const sign = stage(frame, SIGN, REJECT);
        return (
          <div
            style={{
              ...card,
              left: 48,
              top: LANE_Y - 10,
              width: 270,
              padding: "14px 16px",
              borderColor: "var(--crimson)",
              opacity: enter * (1 - leave),
              transform: `translateX(${(1 - enter) * -30}px)`,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)" }}>TECHNICIAN</div>
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 10 }}>
              <div style={{ position: "relative", width: 52, height: 52, borderRadius: 999, border: "1.5px solid var(--border-strong)", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 16, top: 10, width: 20, height: 20, borderRadius: 999, background: "var(--ink-faint)" }} />
                <div style={{ position: "absolute", left: 8, top: 32, width: 36, height: 24, borderRadius: 999, background: "var(--ink-faint)" }} />
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    top: `${scan * 100}%`,
                    height: 2,
                    background: "var(--crimson)",
                    opacity: scan > 0 && !verified ? 1 : 0,
                  }}
                />
              </div>
              <div style={{ fontSize: 13, color: verified ? "var(--crimson)" : "var(--ink-muted)" }}>
                {verified ? "Face verified" : "Scanning face"}
              </div>
            </div>
            <svg width={230} height={34} style={{ marginTop: 8 }}>
              <path
                d="M4 24 C 24 4, 34 30, 54 16 S 84 4, 100 22 S 140 30, 160 12 S 200 18, 224 20"
                fill="none"
                stroke="var(--crimson)"
                strokeWidth={2}
                strokeLinecap="round"
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={1 - sign}
              />
            </svg>
            <div style={{ fontSize: 11, color: "var(--ink-faint)", opacity: sign }}>Signed rejection</div>
          </div>
        );
      })()}

      {/* Fan */}
      <div style={{ position: "absolute", left: 790, top: LANE_Y - 26, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)" }}>COOLING FAN</div>
      <svg width={120} height={120} style={{ position: "absolute", left: 790, top: LANE_Y }}>
        <circle cx={60} cy={60} r={56} fill="none" stroke="var(--border-strong)" strokeWidth={1.5} />
        <g transform={`rotate(${angle} 60 60)`}>
          {[0, 120, 240].map((a) => (
            <ellipse key={a} cx={60} cy={34} rx={11} ry={24} fill="var(--ink-secondary)" transform={`rotate(${a} 60 60)`} />
          ))}
        </g>
        <circle cx={60} cy={60} r={7} fill="var(--bg-elevated)" stroke="var(--ink-secondary)" strokeWidth={2} />
      </svg>
      <div style={{ position: "absolute", left: 790, top: LANE_Y + 132, width: 120, height: 6, borderRadius: 3, background: "var(--bg-muted)", overflow: "hidden" }}>
        <div style={{ width: `${30 + level * 23}%`, height: "100%", background: "var(--ink-secondary)" }} />
      </div>

      {/* Evidence ledger */}
      <div style={{ position: "absolute", left: 48, top: 440, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)" }}>
        EVIDENCE LEDGER: HASH-CHAINED, SIGNED
      </div>
      {ledger.map((e, i) => {
        const p = pop(e.at);
        const link = stage(frame, e.at, e.at + 10);
        return (
          <div key={i}>
            {i > 0 && (
              <div
                style={{
                  position: "absolute",
                  left: 48 + i * 140 - 22,
                  top: 484,
                  width: 22 * link,
                  height: 2,
                  background: "var(--border-strong)",
                }}
              />
            )}
            <div
              style={{
                position: "absolute",
                left: 48 + i * 140,
                top: 466,
                width: 118,
                padding: "8px 0",
                textAlign: "center",
                borderRadius: 8,
                fontSize: 13,
                border: `1.5px solid ${e.accent ? "var(--crimson)" : "var(--border-strong)"}`,
                color: e.accent ? "var(--crimson)" : "var(--ink-secondary)",
                background: "var(--bg)",
                opacity: frame >= e.at ? p : 0,
                transform: `translateY(${(1 - p) * -18}px)`,
              }}
            >
              {e.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
