"use client";

import PlayerFrame from "./PlayerFrame";
import { MiningComposition, MINING_DURATION, MINING_SIZE } from "./MiningComposition";

export default function MiningPlayer() {
  return (
    <PlayerFrame
      component={MiningComposition}
      durationInFrames={MINING_DURATION}
      {...MINING_SIZE}
      label="Documents become insights, insights become clusters, clusters become themes. Simplified sample of the real run."
    />
  );
}
