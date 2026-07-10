import { askAI } from "./client";

export interface AIOptions {
  system: string;
  prompt: string;
  temperature?: number;
  maxTokens?: number;
}

export class AIEngine {
  async generate({
    system,
    prompt,
    temperature = 0.7,
    maxTokens = 600,
  }: AIOptions): Promise<string> {
    const response = await askAI({
      system,
      prompt,
      temperature,
      maxTokens,
    });

    return response.trim();
  }
}

export const aiEngine = new AIEngine();