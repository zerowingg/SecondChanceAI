import { CompatibilityResult } from "../ai/models/compatibility";
import { RelationshipBlueprint } from "../ai/models/blueprint";

let compatibility: CompatibilityResult | null = null;

let blueprint: RelationshipBlueprint | null = null;

export function saveCoachResult(
  compatibilityResult: CompatibilityResult,
  blueprintResult: RelationshipBlueprint
) {
  compatibility = compatibilityResult;
  blueprint = blueprintResult;
}

export function getCoachResult() {
  return {
    compatibility,
    blueprint,
  };
}