"use client";

import PlayerFrame from "./PlayerFrame";
import { MatchingComposition, MATCHING_DURATION, MATCHING_SIZE } from "./MatchingComposition";

export default function MatchingPlayer() {
  return (
    <PlayerFrame
      component={MatchingComposition}
      durationInFrames={MATCHING_DURATION}
      {...MATCHING_SIZE}
      label="Illustrative cohort. Numbers are each mentee's count of compatible mentors; fewest options are matched first."
    />
  );
}
