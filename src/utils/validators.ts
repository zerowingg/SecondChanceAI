export function isValidScore(
  score: unknown
): boolean {
  return (
    typeof score === "number" &&
    score >= 0 &&
    score <= 100
  );
}

export function isNonEmptyString(
  value: unknown
): boolean {
  return (
    typeof value === "string" &&
    value.trim().length > 0
  );
}

export function isStringArray(
  value: unknown
): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "string"
    )
  );
}