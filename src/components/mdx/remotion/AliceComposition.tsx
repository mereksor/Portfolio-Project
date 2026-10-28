import type { CSSProperties } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, Easing } from "remotion";

export const ALICE_DURATION = 420;
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

// Timeline of the hackathon demo. Each event appends a block to the evidence ledger.
const CUT = 80;
const stepUps = [120, 160, 200];
const ANOMALY = 245;
const FACE = 300;
const REJECT = 335;

interface LedgerEvent {
  at: number;
  label: string;
  accent?: boolean;
}

const ledger: LedgerEvent[] = [
  { at: 40, label: "receipt" },
  { at: stepUps[0] + 20, label: "allow" },
  { at: stepUps[1] + 20, label: "allow" },
  { at: stepUps[2] + 20, label: "allow" },
  { at: ANOMALY + 20, label: "hold", accent: true },
  { at: REJECT + 10, label: "reject", accent: true },
];

const captions = [
  { at: 0, text: "Connected: requests verified upstream" },
  { at: CUT, text: "Router unplugged: authority moves to the edge" },
  { at: stepUps[0], text: "Three normal step-ups: allowed" },
  { at: ANOMALY, text: "Full cooling cut: high anomaly, held" },
  { at: FACE, text: "Technician face check, signed rejection" },
  { at: 370, text: "The fan never changes" },
];

const box = (accent = false): CSSProperties => ({
  position: "absolute",
  padding: "12px 14px",
  borderRadius: 8,
  border: `1.5px solid ${accent ? "var(--crimson)" : "var(--border-strong)"}`,
  background: "var(--bg)",
  fontSize: 14,
  color: "var(--ink)",
});

export function AliceComposition() {
  const frame = useCurrentFrame();
  const cut = stage(frame, CUT, CUT + 15);

  const fanLevel = stepUps.filter((t) => frame >= t + 15).length;
  const packet = stage(frame, 10, 40);
  const held = frame >= ANOMALY + 10 && frame < REJECT;
  const anomalyIn = stage(frame, ANOMALY, ANOMALY + 15);
  const faceIn = stage(frame, FACE, FACE + 20);
  const finalPulse = frame >= 370 ? 0.5 + 0.5 * Math.sin((frame - 370) / 6) : 0;

  const caption = [...captions].reverse().find((c) => frame >= c.at) ?? captions[0];
  const captionOpacity = interpolate(frame - caption.at, [0, 12], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)", fontFamily: mono }}>
      <div style={{ position: "absolute", top: 30, left: 48, fontFamily: display, fontSize: 31, color: "var(--ink)", opacity: captionOpacity }}>
        {caption.text}
      </div>

      {/* Topology: cloud agent -> enterprise ingress + SIEM -> edge Pi */}
      <div style={{ ...box(), left: 48, top: 100, width: 150 }}>Cloud agent</div>
      <div style={{ ...box(), left: 250, top: 100, width: 200 }}>Enterprise + SIEM</div>
      <div style={{ ...box(frame >= CUT), left: 540, top: 100, width: 200 }}>
        Edge Pi
        <div style={{ fontSize: 11, color: frame >= CUT ? "var(--crimson)" : "var(--ink-faint)", marginTop: 4, letterSpacing: 1 }}>
          {frame >= CUT ? "AUTHORITY: LOCAL" : "AUTHORITY: ENTERPRISE"}
        </div>
      </div>
      <div style={{ position: "absolute", left: 200, top: 124, width: 48, height: 2, background: "var(--border-strong)" }} />
      <div style={{ position: "absolute", left: 452, top: 124, width: 86, height: 2, background: "var(--border-strong)", opacity: 1 - cut }} />
      <div style={{ position: "absolute", left: 488, top: 108, fontSize: 22, color: "var(--crimson)", opacity: cut }}>x</div>
      <div
        style={{
          position: "absolute",
          left: interpolate(packet, [0, 1], [200, 540]),
          top: 119,
          width: 12,
          height: 12,
          borderRadius: 999,
          background: "var(--crimson)",
          opacity: packet > 0 && packet < 1 ? 1 : 0,
        }}
      />

      {/* Local agent requests after the cut */}
      <div style={{ position: "absolute", left: 540, top: 200, width: 250, fontSize: 13, color: "var(--ink-secondary)", opacity: stage(frame, CUT + 20, CUT + 35) }}>
        Local agents request fan changes
      </div>
      {stepUps.map((t, i) => (
        <div
          key={t}
          style={{
            ...box(),
            left: 540,
            top: 230 + i * 44,
            width: 250,
            padding: "7px 12px",
            fontSize: 13,
            opacity: stage(frame, t, t + 12),
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>Step up</span>
          <span style={{ color: "var(--ink-muted)" }}>low / allow</span>
        </div>
      ))}
      <div
        style={{
          ...box(true),
          left: 540,
          top: 362,
          width: 250,
          padding: "7px 12px",
          fontSize: 13,
          opacity: anomalyIn,
          background: held ? "var(--crimson-wash)" : "var(--bg)",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>Cut all cooling</span>
        <span style={{ color: "var(--crimson)" }}>{frame >= REJECT ? "rejected" : "high / held"}</span>
      </div>

      {/* Fan gauge */}
      <div style={{ position: "absolute", left: 850, top: 200, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)" }}>FAN</div>
      <div style={{ position: "absolute", left: 850, top: 222, width: 46, height: 180, borderRadius: 6, border: "1.5px solid var(--border-strong)", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: `${30 + fanLevel * 20}%`,
            background: "var(--ink-secondary)",
            transition: "none",
            boxShadow: finalPulse ? `0 0 0 ${3 * finalPulse}px var(--crimson-glow)` : undefined,
          }}
        />
      </div>

      {/* Technician */}
      <div style={{ ...box(true), left: 270, top: 300, width: 220, opacity: faceIn }}>
        Technician console
        <div style={{ fontSize: 12, color: "var(--crimson)", marginTop: 6 }}>
          {frame >= REJECT ? "Face verified. Rejection signed." : "Face check..."}
        </div>
      </div>

      {/* Evidence ledger */}
      <div style={{ position: "absolute", left: 48, top: 432, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)" }}>
        EVIDENCE LEDGER (HASH-CHAINED, SIGNED)
      </div>
      {ledger.map((e, i) => {
        const p = stage(frame, e.at, e.at + 12);
        return (
          <div key={i}>
            {i > 0 && (
              <div style={{ position: "absolute", left: 48 + i * 140 - 22, top: 476, width: 22, height: 2, background: "var(--border-strong)", opacity: p }} />
            )}
            <div
              style={{
                position: "absolute",
                left: 48 + i * 140,
                top: 458,
                width: 118,
                padding: "8px 0",
                textAlign: "center",
                borderRadius: 6,
                fontSize: 13,
                border: `1.5px solid ${e.accent ? "var(--crimson)" : "var(--border-strong)"}`,
                color: e.accent ? "var(--crimson)" : "var(--ink-secondary)",
                opacity: p,
                transform: `translateY(${(1 - p) * 10}px)`,
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
