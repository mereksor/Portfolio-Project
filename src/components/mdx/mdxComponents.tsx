import type { MDXComponents } from "mdx/types";
import { getSubProjects } from "@/lib/content";
import Constraint from "./Constraint";
import DeepDiveCards from "./DeepDiveCards";
import FoundationDiagram from "./FoundationDiagram";
import RoboticsFunnel from "./RoboticsFunnel";
import CompatibilityWeights from "./CompatibilityWeights";
import { AlicePlayer, DualPassPlayer, MatchingPlayer, MiningPlayer } from "./players";

// Custom elements available to project MDX. DeepDiveCards is bound to the page's own
// slug so hub MDX can drop it in without props.
export function projectMdxComponents(slug: string): MDXComponents {
  const subs = getSubProjects(slug);
  return {
    Constraint,
    FoundationDiagram,
    RoboticsFunnel,
    MiningPlayer,
    DualPassPlayer,
    MatchingPlayer,
    AlicePlayer,
    CompatibilityWeights,
    DeepDiveCards: () => <DeepDiveCards parent={slug} subs={subs} />,
  };
}
