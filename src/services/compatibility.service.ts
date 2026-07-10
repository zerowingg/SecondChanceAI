import { aiEngine } from "../ai/engine";

import { COMPATIBILITY_SYSTEM_PROMPT } from "../ai/prompts/compatibility";

import { CompatibilityResult } from "../ai/models/compatibility";

import { UserProfile } from "../types/user";

export async function generateCompatibility(
  me: UserProfile,
  other: UserProfile
): Promise<CompatibilityResult> {
  const prompt = `
USER A

${JSON.stringify(me)}

USER B

${JSON.stringify(other)}
`;

  const response = await aiEngine.generate({
    system: COMPATIBILITY_SYSTEM_PROMPT,
    prompt,
    temperature: 0.3,
    maxTokens: 500,
  });

  try {
    return JSON.parse(response) as CompatibilityResult;
  } catch {
    return {
      score: 0,

      summary: "Compatibility unavailable.",

      greenFlags: [],

      redFlags: [],

      iceBreaker: "",
    };
  }
}