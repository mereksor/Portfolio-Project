"use client";

import PlayerFrame from "./PlayerFrame";
import { DualPassComposition, DUAL_PASS_DURATION, DUAL_PASS_SIZE } from "./DualPassComposition";

export default function DualPassPlayer() {
  return (
    <PlayerFrame
      component={DualPassComposition}
      durationInFrames={DUAL_PASS_DURATION}
      {...DUAL_PASS_SIZE}
      label="Illustrative values. Agreeing fields pass, format differences normalize, real conflicts go to a person."
    />
  );
}
