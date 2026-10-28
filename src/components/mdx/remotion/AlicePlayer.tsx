"use client";

import PlayerFrame from "./PlayerFrame";
import { AliceComposition, ALICE_DURATION, ALICE_SIZE } from "./AliceComposition";

export default function AlicePlayer() {
  return (
    <PlayerFrame
      component={AliceComposition}
      durationInFrames={ALICE_DURATION}
      {...ALICE_SIZE}
      label="The DN Hacks 2026 demo, simplified. Every request and decision lands in the ledger, which syncs to the SIEM on reconnect."
    />
  );
}
