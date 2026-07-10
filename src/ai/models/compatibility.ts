export interface CompatibilityResult {
  score: number;

  summary: string;

  greenFlags: string[];

  redFlags: string[];

  iceBreaker: string;
}