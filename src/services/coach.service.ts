import { UserProfile } from "../types/user";

export interface CoachResult {
  score: number;

  compatibility: string;

  greenFlags: string[];

  challenges: string[];

  tips: string;

  starters: string[];
}

/*
---------------------------------------------------
Generate prompt for AMD AI
---------------------------------------------------
*/

export function buildCoachPrompt(
  me: UserProfile,
  partner: UserProfile
): string {
  return `
You are an expert relationship coach.

Compare these two dating profiles.

USER A

Name: ${me.fullName}
Age: ${me.age}
Gender: ${me.gender}
City: ${me.city}
Occupation: ${me.occupation}

Bio:
${me.bio}

Interests:
${me.interests.join(", ")}

Goals:
${me.goals.join(", ")}

Values:
${me.values.join(", ")}

Languages:
${me.languages.join(", ")}

Lifestyle:
${JSON.stringify(me.lifestyle)}

AI Answers:
${JSON.stringify(me.aiAnswers)}

--------------------------

USER B

Name: ${partner.fullName}
Age: ${partner.age}
Gender: ${partner.gender}
City: ${partner.city}
Occupation: ${partner.occupation}

Bio:
${partner.bio}

Interests:
${partner.interests.join(", ")}

Goals:
${partner.goals.join(", ")}

Values:
${partner.values.join(", ")}

Languages:
${partner.languages.join(", ")}

Lifestyle:
${JSON.stringify(partner.lifestyle)}

AI Answers:
${JSON.stringify(partner.aiAnswers)}

--------------------------

Return ONLY valid JSON.

{
"score":95,
"compatibility":"",
"greenFlags":[
"",
"",
""
],
"challenges":[
"",
"",
""
],
"tips":"",
"starters":[
"",
"",
""
]
}
`;
}

/*
---------------------------------------------------
Temporary Mock AI

Replace later with AMD AI call
---------------------------------------------------
*/

export async function generateCoachResult(
  me: UserProfile,
  partner: UserProfile
): Promise<CoachResult> {
  const prompt = buildCoachPrompt(me, partner);

  console.log(prompt);

  await new Promise((resolve) =>
    setTimeout(resolve, 1800)
  );

  return {
    score: 95,

    compatibility:
      "You both value honesty, communication and long-term commitment. Your personalities complement each other well.",

    greenFlags: [
      "Strong emotional compatibility",
      "Shared relationship goals",
      "Good communication styles",
    ],

    challenges: [
      "Busy schedules",
      "Different sleeping habits",
      "Need consistent communication",
    ],

    tips:
      "Ask open-ended questions, celebrate achievements together and communicate expectations early.",

    starters: [
      "What's your dream destination?",
      "What motivates you every day?",
      "Which life goal are you most excited about?",
    ],
  };
}