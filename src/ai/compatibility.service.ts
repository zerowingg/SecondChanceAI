import { aiEngine } from "./engine";

import { COMPATIBILITY_SYSTEM_PROMPT } from "./prompts/compatibility";

import { CompatibilityResult } from "./models/compatibility";

export async function generateCompatibility(
  myProfile: any,
  otherProfile: any
): Promise<CompatibilityResult> {
  const prompt = `
USER A

${JSON.stringify(myProfile)}

USER B

${JSON.stringify(otherProfile)}
`;

  const response =
    await aiEngine.generate({
      system:
        COMPATIBILITY_SYSTEM_PROMPT,
      prompt,
      temperature: 0.3,
      maxTokens: 500,
    });

  try {
    return JSON.parse(
      response
    ) as CompatibilityResult;
  } catch {
    return {
      score: 0,

      summary:
        "Compatibility unavailable.",

      greenFlags: [],

      redFlags: [],

      iceBreaker: "",
    };
  }
}