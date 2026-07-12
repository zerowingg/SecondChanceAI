const AI_API =
  "https://secondchance-ai-api.ankitanurag383.workers.dev";

interface AIResponse {
  reply?: string;
  error?: string;
}

async function callAI(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  try {
    const response = await fetch(AI_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        system: systemPrompt,
        prompt: userPrompt,
        temperature: 0.7,
        maxTokens: 600,
      }),
    });

    const data: AIResponse =
      await response.json();

    console.log("AI RESPONSE:", data);

    if (!response.ok) {
      throw new Error(
        data.error ||
          `HTTP ${response.status}`
      );
    }

    return (
      data.reply ??
      "No AI response generated."
    );
  } catch (error) {
    console.log(
      "AI Client Error:",
      error
    );

    throw error;
  }
}

/* ------------------------------------------------ */

export async function generateIceBreaker(
  currentUser: string,
  otherUser: string
) {
  return callAI(
    "You are a professional dating coach.",
`
Generate ONE natural conversation starter.

Current User

${currentUser}

Other User

${otherUser}

Rules

- One sentence only
- Under 25 words
- Friendly
- Natural
- No emojis.
`
  );
}

/* ------------------------------------------------ */

export async function generateCompatibility(
  currentUser: string,
  otherUser: string
) {
  return callAI(
    "You are an expert relationship psychologist.",
`
Compare these two people.

User A

${currentUser}

User B

${otherUser}

Return ONLY valid JSON.

{
"score":95,
"summary":"",
"strengths":["",""],
"challenges":["",""]
}
`
  );
}

/* ------------------------------------------------ */

export async function generateSmartReply(
  conversation: string
) {
  return callAI(
    "You help users write warm dating replies.",
`
Conversation

${conversation}

Generate ONE reply.

Under 20 words.

No emojis.
`
  );
}

/* ------------------------------------------------ */

export async function generateRelationshipAdvice(
  conversation: string
) {
  return callAI(
    "You are a professional relationship coach.",
`
Conversation

${conversation}

Give practical advice.

Maximum 80 words.
`
  );
}

/* ------------------------------------------------ */

export async function generateDateIdea(
  currentUser: string,
  otherUser: string
) {
  return callAI(
    "You are an expert first-date planner.",
`
Current User

${currentUser}

Other User

${otherUser}

Suggest one personalized first date.

Explain why.

Maximum 60 words.
`
  );
}