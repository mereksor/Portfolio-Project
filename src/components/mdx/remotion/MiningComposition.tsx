import { AbsoluteFill, interpolate, random, useCurrentFrame, Easing } from "remotion";

export const MINING_DURATION = 330;

const W = 960;
const H = 540;
const DOTS = 140;
const CLUSTERS = 10;

const mono = "var(--font-dm-mono), ui-monospace, monospace";
const display = "var(--font-newsreader), Georgia, serif";

// Cluster centers sit in two rows of five; the three theme bands group them left to right.
const centers = Array.from({ length: CLUSTERS }, (_, i) => ({
  x: 150 + (i % 5) * 165,
  y: i < 5 ? 220 : 370,
}));

const bands = [
  { label: "Planning", from: 0, to: 1 },
  { label: "Execution", from: 2, to: 3 },
  { label: "Financial", from: 4, to: 4 },
];

const ease = Easing.inOut(Easing.cubic);

function stage(frame: number, start: number, end: number) {
  return interpolate(frame, [start, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
}

const captions = [
  { at: 0, text: "~2,500 change orders" },
  { at: 70, text: "~3,900 extracted insights" },
  { at: 150, text: "Embedded and clustered (k = 10)" },
  { at: 240, text: "10 themes leadership can act on" },
];

export function MiningComposition() {
  const frame = useCurrentFrame();

  const toDots = stage(frame, 50, 110);
  const toClusters = stage(frame, 140, 220);
  const showBands = stage(frame, 235, 270);

  const caption = [...captions].reverse().find((c) => frame >= c.at) ?? captions[0];
  const captionOpacity = interpolate(frame - caption.at, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: "var(--bg-elevated)" }}>
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          fontFamily: display,
          fontSize: 34,
          color: "var(--ink)",
          opacity: captionOpacity,
        }}
      >
        {caption.text}
      </div>

      {bands.map((band) => {
        const x1 = 150 + band.from * 165 - 70;
        const x2 = 150 + band.to * 165 + 70;
        return (
          <div
            key={band.label}
            style={{
              position: "absolute",
              left: x1,
              width: x2 - x1,
              top: 455,
              opacity: showBands,
              borderTop: "2px solid var(--crimson)",
              paddingTop: 10,
              textAlign: "center",
              fontFamily: mono,
              fontSize: 16,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "var(--ink-muted)",
            }}
          >
            {band.label}
          </div>
        );
      })}

      {Array.from({ length: DOTS }, (_, i) => {
        const cluster = i % CLUSTERS;
        // Documents start on a tidy grid, scatter as raw insights, then settle into clusters.
        const gridX = 90 + (i % 20) * 41;
        const gridY = 140 + Math.floor(i / 20) * 46;
        const scatterX = 70 + random(`sx${i}`) * (W - 140);
        const scatterY = 120 + random(`sy${i}`) * (H - 210);
        const angle = random(`a${i}`) * Math.PI * 2;
        const radius = 8 + random(`r${i}`) * 34;
        const clusterX = centers[cluster].x + Math.cos(angle) * radius;
        const clusterY = centers[cluster].y + Math.sin(angle) * radius * 0.8;

        const x = interpolate(toClusters, [0, 1], [interpolate(toDots, [0, 1], [gridX, scatterX]), clusterX]);
        const y = interpolate(toClusters, [0, 1], [interpolate(toDots, [0, 1], [gridY, scatterY]), clusterY]);

        const appear = interpolate(frame, [i * 0.3, i * 0.3 + 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        const w = interpolate(toDots, [0, 1], [26, 9]);
        const h = interpolate(toDots, [0, 1], [34, 9]);
        const isAccent = toClusters > 0.5 && cluster % 3 === 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x - w / 2,
              top: y - h / 2,
              width: w,
              height: h,
              borderRadius: interpolate(toDots, [0, 1], [3, 999]),
              background: isAccent ? "var(--crimson)" : "var(--ink-secondary)",
              border: toDots < 0.5 ? "1px solid var(--border-strong)" : "none",
              opacity: appear * interpolate(toDots, [0, 1], [0.35, 0.85]),
            }}
          />
        );
      })}

      {centers.map((c, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: c.x - 52,
            top: c.y - 46,
            width: 104,
            height: 92,
            borderRadius: 999,
            border: "1.5px solid var(--crimson)",
            opacity: stage(frame, 200 + i * 2, 225 + i * 2) * 0.7,
          }}
        />
      ))}
    </AbsoluteFill>
  );
}

export const MINING_SIZE = { width: W, height: H };
