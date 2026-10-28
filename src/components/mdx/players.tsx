"use client";

import dynamic from "next/dynamic";

// Remotion only loads on the pages that embed a player, and never on the server.
const placeholder = () => (
  <div className="not-prose my-8 aspect-video w-full rounded-lg border border-border bg-bg-muted" />
);

export const MiningPlayer = dynamic(() => import("./remotion/MiningPlayer"), {
  ssr: false,
  loading: placeholder,
});

export const DualPassPlayer = dynamic(() => import("./remotion/DualPassPlayer"), {
  ssr: false,
  loading: placeholder,
});

export const MatchingPlayer = dynamic(() => import("./remotion/MatchingPlayer"), {
  ssr: false,
  loading: placeholder,
});

export const AlicePlayer = dynamic(() => import("./remotion/AlicePlayer"), {
  ssr: false,
  loading: placeholder,
});
