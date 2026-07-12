import { aiEngine } from "./engine";
import { BLUEPRINT_SYSTEM_PROMPT } from "./prompts/blueprint";
import { RelationshipBlueprint } from "./models/blueprint";

function extractJSON(text: string): string {
  if (!text) return "";

  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");

  if (start === -1 || end === -1) {
    return cleaned;
  }

  return cleaned.substring(start, end + 1);
}

export async function generateBlueprint(
  myProfile: any,
  otherProfile: any
): Promise<RelationshipBlueprint> {
  const prompt = `
USER A

${JSON.stringify(myProfile)}

USER B

${JSON.stringify(otherProfile)}
`;

  try {
    const response = await aiEngine.generate({
      system: BLUEPRINT_SYSTEM_PROMPT,
      prompt,
      temperature: 0.3,
      maxTokens: 700,
    });

    console.log("Blueprint RAW:", response);

    const json = extractJSON(response);

    console.log("Blueprint JSON:", json);

    const parsed = JSON.parse(json);

    return {
      compatibilityScore:
        parsed.compatibilityScore ?? parsed.score ?? 0,

      communicationStyle:
        parsed.communicationStyle ?? "Unknown",

      attachmentStyle:
        parsed.attachmentStyle ?? "Unknown",

      loveLanguage:
        parsed.loveLanguage ?? "Unknown",

      emotionalIntelligence:
        parsed.emotionalIntelligence ?? "Unknown",

      conflictResolution:
        parsed.conflictResolution ?? "Unknown",

      relationshipReadiness:
        parsed.relationshipReadiness ?? "Unknown",

      greenFlags:
        parsed.greenFlags ?? [],

      growthAreas:
        parsed.growthAreas ?? [],

      summary:
        parsed.summary ??
        "Unable to generate relationship DNA.",
    };
  } catch (error) {
    console.log("Blueprint Parse Error:", error);

    return {
      compatibilityScore: 0,
      communicationStyle: "Unknown",
      attachmentStyle: "Unknown",
      loveLanguage: "Unknown",
      emotionalIntelligence: "Unknown",
      conflictResolution: "Unknown",
      relationshipReadiness: "Unknown",
      greenFlags: [],
      growthAreas: [],
      summary:
        "Unable to generate relationship DNA.",
    };
  }
}