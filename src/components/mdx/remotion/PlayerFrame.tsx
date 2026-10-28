"use client";

import { Player } from "@remotion/player";
import type { ComponentType } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

interface PlayerFrameProps {
  component: ComponentType<Record<string, never>>;
  durationInFrames: number;
  width: number;
  height: number;
  label: string;
}

export default function PlayerFrame({ component, durationInFrames, width, height, label }: PlayerFrameProps) {
  const reduced = useReducedMotion();

  return (
    <figure className="not-prose my-8">
      <div className="overflow-hidden rounded-lg border border-border">
        <Player
          // Remount on preference change so autoplay and the poster frame take effect.
          key={reduced ? "still" : "motion"}
          component={component}
          durationInFrames={durationInFrames}
          compositionWidth={width}
          compositionHeight={height}
          fps={30}
          controls
          loop={!reduced}
          autoPlay={!reduced}
          initialFrame={reduced ? durationInFrames - 1 : 0}
          style={{ width: "100%" }}
          // No audio, and the site CSP blocks the silent data: clips Remotion preloads.
          numberOfSharedAudioTags={0}
          acknowledgeRemotionLicense
        />
      </div>
      <figcaption className="mt-3 font-mono text-[11px] text-ink-faint">{label}</figcaption>
    </figure>
  );
}
