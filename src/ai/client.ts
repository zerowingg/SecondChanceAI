const AI_API =
  "https://secondchance-ai-api.ankitanurag383.workers.dev";

export interface AIRequest {
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export async function askAI({
  system,
  prompt,
  temperature = 0.7,
  maxTokens = 600,
}: AIRequest): Promise<string> {
  try {
    const response = await fetch(AI_API, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        system,
        prompt,
        temperature,
        maxTokens,
      }),
    });

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    if (!response.ok) {
      console.log("AI SERVER ERROR:", data);

      throw new Error(
        data.error ||
          `HTTP ${response.status}`
      );
    }

    if (!data.reply) {
      throw new Error(
        "Empty AI response."
      );
    }

    return data.reply.trim();
  } catch (error: any) {
    console.log(
      "AI Client Error:",
      error
    );

    throw error;
  }
}