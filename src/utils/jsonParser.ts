export function parseAIJSON<T>(
  text: string,
  fallback: T
): T {
  try {
    // Remove markdown code fences if AI returns them
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleaned) as T;
  } catch (error) {
    console.log(
      "JSON Parse Error:",
      error
    );

    return fallback;
  }
}