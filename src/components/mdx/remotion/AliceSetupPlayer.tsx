"use client";

import PlayerFrame from "./PlayerFrame";
import { AliceSetupComposition, ALICE_SETUP_DURATION, ALICE_SETUP_SIZE } from "./AliceSetupComposition";

export default function AliceSetupPlayer() {
  return (
    <PlayerFrame
      component={AliceSetupComposition}
      durationInFrames={ALICE_SETUP_DURATION}
      {...ALICE_SETUP_SIZE}
      label="The physical demo table at DN Hacks 2026 and how a request moved across it, connected and offline."
    />
  );
}
