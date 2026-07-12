import { UserProfile } from "../types/user";

function compareArrays(
  first: string[] = [],
  second: string[] = []
) {
  if (!first.length || !second.length) {
    return 0;
  }

  const matches = first.filter((item) =>
    second.includes(item)
  );

  return (
    matches.length /
    Math.max(first.length, second.length)
  );
}

function compareText(
  first = "",
  second = ""
) {
  if (!first || !second) {
    return 0;
  }

  return first === second ? 1 : 0;
}

export function calculateMatchScore(
  currentUser: UserProfile,
  otherUser: UserProfile
) {
  const interests = compareArrays(
    currentUser.interests,
    otherUser.interests
  );

  const values = compareArrays(
    currentUser.values,
    otherUser.values
  );

  const goals = compareArrays(
    currentUser.goals,
    otherUser.goals
  );

  const lifestyle = compareArrays(
  Object.values(currentUser.lifestyle),
  Object.values(otherUser.lifestyle)
);

  const languages = compareArrays(
    currentUser.languages,
    otherUser.languages
  );

  const userType = compareText(
    currentUser.userType,
    otherUser.userType
  );

  const score =
    (
      interests * 0.25 +
      values * 0.25 +
      goals * 0.20 +
      lifestyle * 0.15 +
      languages * 0.10 +
      userType * 0.05
    ) * 100;

  return Math.round(score);
}