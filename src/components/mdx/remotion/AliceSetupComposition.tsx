import type { CSSProperties } from "react";
import { AbsoluteFill, Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

export const ALICE_SETUP_DURATION = 690;
export const ALICE_SETUP_SIZE = { width: 960, height: 540 };

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

// Timeline in frames at 30fps.
const CABLES = 150;
const PART1 = 220;
const UNPLUG = 350;
const STEP_STARTS = [395, 430, 465];
const CUT_REQ = 505;
const HOLD = CUT_REQ + 26;
const SCAN = 555;
const REJECT = 590;
const RECONNECT = 620;
const SYNC = 640;

type Point = [number, number];

// Device anchor points, left to right as they sat on the table.
const ROUTER_TOP: Point = [316, 286];
const ROUTER_MID: Point = [296, 306];
const PI_MID: Point = [420, 306];
const CONSOLE_PORT: Point = [230, 310];
const ENTERPRISE_TOP: Point = [832, 190];
const UPLINK: Point[] = [ENTERPRISE_TOP, [832, 168], [316, 168], ROUTER_TOP];
// The console's link to the Pi stays up through the outage, so it bypasses the router.
const CONSOLE_LINK: Point[] = [PI_MID, [420, 346], [246, 346], [246, 310], CONSOLE_PORT];

function toPath(points: Point[]) {
  return points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");
}

// Position along a polyline at progress t, so packets follow the drawn cables exactly.
function along(points: Point[], t: number): Point {
  const lengths = points.slice(1).map(([x, y], i) => Math.hypot(x - points[i][0], y - points[i][1]));
  let remaining = t * lengths.reduce((a, b) => a + b, 0);
  for (let i = 0; i < lengths.length; i++) {
    if (remaining <= lengths[i] || i === lengths.length - 1) {
      const k = lengths[i] === 0 ? 0 : Math.min(remaining / lengths[i], 1);
      const [x0, y0] = points[i];
      const [x1, y1] = points[i + 1];
      return [x0 + (x1 - x0) * k, y0 + (y1 - y0) * k];
    }
    remaining -= lengths[i];
  }
  return points[points.length - 1];
}

interface Packet {
  start: number;
  duration: number;
  path: Point[];
  accent: boolean;
}

const packets: Packet[] = [
  { start: PART1 + 10, duration: 50, path: [...UPLINK, ROUTER_MID, PI_MID], accent: false },
  { start: PART1 + 66, duration: 28, path: CONSOLE_LINK, accent: false },
  { start: HOLD, duration: 26, path: CONSOLE_LINK, accent: true },
  { start: SYNC, duration: 34, path: [PI_MID, ROUTER_MID, ...[...UPLINK].reverse()], accent: false },
];

interface Cable {
  d: string;
  at: number;
  // Wi-Fi links render dotted and drop when the router is unplugged.
  wifi?: boolean;
}

const cables: Cable[] = [
  { d: toPath([[420, 336], ...CONSOLE_LINK.slice(1)]), at: CABLES },
  { d: toPath([[334, 306], [368, 306]]), at: CABLES + 8, wifi: true },
  { d: toPath(UPLINK), at: CABLES + 16, wifi: true },
  { d: toPath([[472, 300], [506, 300]]), at: CABLES + 24 },
];

interface AgentRequest {
  start: number;
  label: string;
  high: boolean;
}

const agentRequests: AgentRequest[] = [
  ...STEP_STARTS.map((start) => ({ start, label: "fan +1", high: false })),
  { start: CUT_REQ, label: "cut cooling", high: true },
];

interface LedgerEvent {
  at: number;
  label: string;
  accent: boolean;
}

const ledger: LedgerEvent[] = [
  { at: PART1 + 40, label: "receipt", accent: false },
  ...STEP_STARTS.map((s) => ({ at: s + 30, label: "allow", accent: false })),
  { at: HOLD, label: "hold", accent: true },
  { at: REJECT + 6, label: "reject", accent: true },
];

const captions = [
  { at: 0, text: "The demo table, left to right" },
  { at: CABLES, text: "The router's Wi-Fi links the cloud side to the Pi" },
  { at: PART1, text: "Part 1: a signed cloud request, verified upstream" },
  { at: UNPLUG, text: "Part 2: router unplugged, the Wi-Fi drops" },
  { at: STEP_STARTS[0], text: "Local agents step the fan up; the Pi allows it" },
  { at: CUT_REQ, text: "A full cooling cut is held for the technician" },
  { at: SCAN, text: "Face check, signed rejection, fan unchanged" },
  { at: RECONNECT, text: "On reconnect, the ledger syncs to Wazuh" },
];

interface Device {
  at: number;
  x: number;
  label: string;
  role: string;
  // Swaps its role line for the local-authority tag while offline.
  local?: boolean;
}

const devices: Device[] = [
  { at: 10, x: 130, label: "Tech console", role: "Tauri app" },
  { at: 30, x: 296, label: "Router", role: "Wi-Fi" },
  { at: 50, x: 420, label: "Raspberry Pi 4", role: "governed runtime", local: true },
  { at: 70, x: 556, label: "ESP32-S3", role: "telemetry lights" },
  { at: 90, x: 832, label: "Enterprise", role: "ADK agent + Wazuh" },
];

// Fan level rises after each allowed step-up and is never touched by the rejected cut.
function fanLevel(frame: number) {
  return STEP_STARTS.reduce((sum, s) => sum + stage(frame, s + 24, s + 36), 0);
}

const outline: CSSProperties = {
  position: "absolute",
  border: "1.5px solid var(--border-strong)",
  background: "var(--bg)",
  boxSizing: "border-box",
};

export function AliceSetupComposition() {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = (start: number) => spring({ frame: frame - start, fps, config: { damping: 200 } });
  const show = (start: number) => (frame >= start ? pop(start) : 0);

  const unplugged = stage(frame, UNPLUG, UNPLUG + 20) * (1 - stage(frame, RECONNECT, RECONNECT + 20));
  const local = stage(frame, UNPLUG + 10, UNPLUG + 30) * (1 - stage(frame, RECONNECT + 10, RECONNECT + 30));
  const level = fanLevel(frame);
  const dashOffset = -frame * 1.4;

  const held = frame >= HOLD && frame < REJECT;
  const pulse = held ? 0.5 + 0.5 * Math.sin((frame - HOLD) / 4) : 0;
  const scan = stage(frame, SCAN + 4, REJECT - 6);

  // The technician console's screen tracks the story beat.
  let consoleTitle = "telemetry live";
  let consoleLine = "fan 30%  temp ok";
  let consoleAccent = false;
  if (frame >= PART1 + 88) {
    consoleTitle = "req 7f3a";
    consoleLine = "verified upstream";
  }
  if (frame >= UNPLUG + 20) {
    consoleTitle = "authority: local";
    consoleLine = `fan ${30 + Math.round(level) * 20}%`;
  }
  if (frame >= HOLD + 20) {
    consoleTitle = "HOLD";
    consoleLine = "cut all cooling";
    consoleAccent = true;
  }
  if (frame >= SCAN) consoleLine = scan < 1 ? "face check..." : "face verified";
  if (frame >= REJECT) {
    consoleTitle = "REJECTED";
    consoleLine = "signed by technician";
  }

  const terminal = [
    { at: 120, text: "adk agent   online", accent: false },
    { at: PART1 + 40, text: "wazuh  receipt 7f3a", accent: false },
    // The outage line gives way to the sync confirmation on reconnect.
    frame < RECONNECT + 10
      ? { at: UNPLUG + 14, text: "uplink   lost", accent: true }
      : { at: SYNC + 34, text: "ledger synced (6)", accent: false },
  ];

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)", fontFamily: mono, color: "var(--ink)" }}>
      {captions.map((c, i) => {
        const next = captions[i + 1]?.at;
        const fadeOut = next === undefined ? 0 : stage(frame, next - 4, next + 6);
        const fadeIn = stage(frame, c.at + 8, c.at + 22);
        const opacity = fadeIn * (1 - fadeOut);
        const y = interpolate(fadeIn, [0, 1], [8, 0]);
        return (
          <div
            key={c.text}
            style={{ position: "absolute", top: 30, left: 48, fontFamily: display, fontSize: 32, opacity, transform: `translateY(${y}px)` }}
          >
            {c.text}
          </div>
        );
      })}

      {/* Cables */}
      <svg width={960} height={540} style={{ position: "absolute", inset: 0 }}>
        {cables.map((c) => {
          const drawn = stage(frame, c.at, c.at + 30);
          const cut = c.wifi ? unplugged : 0;
          return (
            <g key={c.d}>
              {c.wifi ? (
                <path d={c.d} fill="none" stroke="var(--border-strong)" strokeWidth={2} strokeDasharray="2 6" strokeLinecap="round" opacity={drawn * (1 - cut * 0.8)} />
              ) : (
                <path d={c.d} fill="none" stroke="var(--border-strong)" strokeWidth={2} pathLength={1} strokeDasharray={1} strokeDashoffset={1 - drawn} />
              )}
              {/* A moving dash marks live links once the cables are in. */}
              <path
                d={c.d}
                fill="none"
                stroke="var(--ink-faint)"
                strokeWidth={2}
                strokeDasharray="4 14"
                strokeDashoffset={dashOffset}
                opacity={stage(frame, c.at + 30, c.at + 40) * (1 - cut)}
              />
            </g>
          );
        })}
        {/* Wi-Fi arcs over the router, gone while it is unplugged. */}
        <g opacity={stage(frame, CABLES, CABLES + 20) * (1 - unplugged)} fill="none" stroke="var(--ink-faint)" strokeWidth={2} strokeLinecap="round">
          {[8, 15, 22].map((r) => (
            <path key={r} d={`M${280 - r * 0.7} ${280 - r * 0.7} A${r} ${r} 0 0 1 ${280 + r * 0.7} ${280 - r * 0.7}`} />
          ))}
        </g>
        {/* Unplug marker on the router's Wi-Fi uplink. */}
        <g opacity={unplugged} transform={`translate(316 ${226 - unplugged * 10})`}>
          <line x1={-9} y1={-9} x2={9} y2={9} stroke="var(--crimson)" strokeWidth={3} strokeLinecap="round" />
          <line x1={9} y1={-9} x2={-9} y2={9} stroke="var(--crimson)" strokeWidth={3} strokeLinecap="round" />
        </g>
      </svg>

      {/* Technician console laptop */}
      <div style={{ opacity: show(devices[0].at) }}>
        <div
          style={{
            ...outline,
            left: 40,
            top: 190,
            width: 180,
            height: 112,
            borderRadius: 8,
            padding: "14px 12px",
            whiteSpace: "nowrap",
            borderColor: held ? "var(--crimson)" : "var(--border-strong)",
            boxShadow: held ? `0 0 0 ${2 + pulse * 5}px var(--crimson-glow)` : undefined,
          }}
        >
          <div style={{ fontSize: 11, letterSpacing: 2, color: "var(--ink-faint)" }}>CONSOLE</div>
          <div style={{ marginTop: 10, fontSize: 16, color: consoleAccent ? "var(--crimson)" : "var(--ink)" }}>{consoleTitle}</div>
          <div style={{ marginTop: 6, fontSize: 13, color: "var(--ink-muted)" }}>{consoleLine}</div>
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: `${scan * 100}%`,
              height: 2,
              background: "var(--crimson)",
              opacity: scan > 0 && scan < 1 ? 1 : 0,
            }}
          />
        </div>
        <div style={{ ...outline, left: 28, top: 302, width: 204, height: 12, borderRadius: "0 0 8px 8px" }} />
      </div>

      {/* Router */}
      <div style={{ opacity: show(devices[1].at) }}>
        <div style={{ ...outline, left: 258, top: 286, width: 76, height: 40, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 7 }}>
          {[0, 1, 2].map((i) => {
            const blink = 0.55 + 0.45 * Math.sin(frame / 5 + i * 2);
            // Every light goes dark while the router is unplugged.
            return (
              <div key={i} style={{ width: 7, height: 7, borderRadius: 999, background: "var(--ink-secondary)", opacity: blink * (1 - unplugged * 0.85) }} />
            );
          })}
        </div>
      </div>

      {/* Raspberry Pi: board, header pins, SoC, and the USB drive holding the ledger. */}
      <div style={{ opacity: show(devices[2].at) }}>
        <div
          style={{
            ...outline,
            left: 368,
            top: 270,
            width: 104,
            height: 66,
            borderRadius: 6,
            borderColor: local > 0.5 ? "var(--crimson)" : "var(--border-strong)",
            boxShadow: `0 0 0 ${local * 5}px var(--crimson-wash)`,
          }}
        >
          <div style={{ position: "absolute", left: 8, top: 6, display: "flex", gap: 4 }}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} style={{ width: 4, height: 4, borderRadius: 999, background: "var(--ink-faint)" }} />
            ))}
          </div>
          <div style={{ position: "absolute", left: 38, top: 22, width: 28, height: 28, borderRadius: 3, background: "var(--ink-secondary)" }} />
        </div>
        <div style={{ ...outline, left: 476, top: 312, width: 22, height: 12, borderRadius: 3, background: "var(--bg-muted)" }} />
      </div>

      {/* Local agent requests drop into the Pi. */}
      {agentRequests.map((r) => {
        const enter = show(r.start);
        const settle = stage(frame, r.start + 16, r.start + 30);
        // Allowed requests sink into the Pi; the held cut stays visible until rejection.
        const leave = r.high ? stage(frame, REJECT + 4, REJECT + 18) : settle;
        if (frame < r.start || leave >= 1) return null;
        const verdict = r.high ? (frame >= REJECT ? "rejected" : frame >= HOLD ? "held" : "") : frame >= r.start + 18 ? "allowed" : "";
        return (
          <div
            key={r.start}
            style={{
              ...outline,
              left: 360,
              top: 196 + (r.high ? 0 : settle * 46),
              width: 120,
              padding: "6px 0",
              borderRadius: 8,
              textAlign: "center",
              fontSize: 14,
              borderColor: r.high ? "var(--crimson)" : "var(--border-strong)",
              color: r.high ? "var(--crimson)" : "var(--ink)",
              opacity: enter * (1 - leave),
              transform: `translateY(${(1 - enter) * -16}px)`,
            }}
          >
            {r.label}
            <div style={{ fontSize: 11, color: r.high ? "var(--crimson)" : "var(--ink-faint)", height: 14 }}>{verdict}</div>
          </div>
        );
      })}

      {/* ESP32-S3 lights on paper: power, fan, temperature, battery rows. */}
      <div style={{ opacity: show(devices[3].at) }}>
        <div style={{ ...outline, left: 506, top: 236, width: 100, height: 112, borderRadius: 4, borderColor: "var(--border)" }}>
          {["PWR", "FAN", "TMP", "BAT"].map((row, r) => (
            <div key={row} style={{ position: "absolute", left: 12, top: 14 + r * 24, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 30, fontSize: 10, color: "var(--ink-faint)" }}>{row}</span>
              {[0, 1].map((i) => {
                const fanRow = r === 1;
                const glow = fanRow ? 0.3 + level * 0.23 : 0.6 + 0.25 * Math.sin(frame / 9 + r + i);
                return (
                  <div
                    key={i}
                    style={{
                      width: 12,
                      height: 12,
                      borderRadius: 999,
                      background: "var(--ink-secondary)",
                      opacity: glow,
                      boxShadow: fanRow ? `0 0 ${level * 4}px var(--ink-faint)` : undefined,
                    }}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Enterprise laptop: terminal with the ADK agent and Wazuh. */}
      <div style={{ opacity: show(devices[4].at) }}>
        <div style={{ ...outline, left: 742, top: 190, width: 180, height: 112, borderRadius: 8, padding: "12px 12px" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "var(--ink-faint)" }}>TERMINAL</div>
          {terminal.map((line) => (
            <div
              key={line.text}
              style={{ marginTop: 5, fontSize: 12, color: line.accent ? "var(--crimson)" : "var(--ink-secondary)", opacity: stage(frame, line.at, line.at + 8) }}
            >
              {line.text}
            </div>
          ))}
        </div>
        <div style={{ ...outline, left: 730, top: 302, width: 204, height: 12, borderRadius: "0 0 8px 8px" }} />
      </div>

      {/* Device labels */}
      {devices.map((d) => {
        const p = show(d.at + 6);
        return (
          <div
            key={d.label}
            style={{ position: "absolute", left: d.x - 80, top: 368, width: 160, textAlign: "center", opacity: p, transform: `translateY(${(1 - p) * 8}px)` }}
          >
            <div style={{ fontSize: 15 }}>{d.label}</div>
            {d.role && (
              <div style={{ position: "relative", marginTop: 3, height: 16, fontSize: 12 }}>
                <span style={{ position: "absolute", left: 0, right: 0, color: "var(--ink-faint)", opacity: d.local ? 1 - local : 1 }}>{d.role}</span>
                {d.local && <span style={{ position: "absolute", left: 0, right: 0, color: "var(--crimson)", opacity: local }}>authority: local</span>}
              </div>
            )}
          </div>
        );
      })}

      {packets.map((p) => {
        const t = stage(frame, p.start, p.start + p.duration);
        if (t <= 0 || t >= 1) return null;
        const [x, y] = along(p.path, t);
        return (
          <div
            key={p.start}
            style={{ position: "absolute", left: x - 6, top: y - 6, width: 12, height: 12, borderRadius: 999, background: p.accent ? "var(--crimson)" : "var(--ink)" }}
          />
        );
      })}

      {/* Evidence ledger on the Pi's USB drive */}
      <div style={{ position: "absolute", left: 48, top: 444, fontSize: 12, letterSpacing: 2, color: "var(--ink-faint)", opacity: stage(frame, PART1, PART1 + 14) }}>
        LEDGER ON THE PI&apos;S USB DRIVE: HASH-CHAINED, SIGNED
      </div>
      {ledger.map((e, i) => {
        const p = show(e.at);
        const link = stage(frame, e.at, e.at + 10);
        const synced = stage(frame, SYNC + 4 + i * 5, SYNC + 14 + i * 5);
        return (
          <div key={i}>
            {i > 0 && (
              <div style={{ position: "absolute", left: 48 + i * 145 - 24, top: 488, width: 24 * link, height: 2, background: "var(--border-strong)" }} />
            )}
            <div
              style={{
                position: "absolute",
                left: 48 + i * 145,
                top: 470,
                width: 121,
                padding: "8px 0",
                textAlign: "center",
                borderRadius: 8,
                fontSize: 14,
                border: `1.5px solid ${e.accent ? "var(--crimson)" : "var(--border-strong)"}`,
                color: e.accent ? "var(--crimson)" : "var(--ink-secondary)",
                background: synced > 0.5 ? "var(--bg-muted)" : "var(--bg)",
                opacity: p,
                transform: `translateY(${(1 - p) * -18}px)`,
              }}
            >
              {e.label}
              <span style={{ marginLeft: 6, fontSize: 11, color: "var(--ink-faint)", opacity: synced }}>synced</span>
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
}
