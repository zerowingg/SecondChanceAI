import { ImageSourcePropType } from "react-native";

const maleAvatars = [
  require("../../assets/avatars/male1.png"),
  require("../../assets/avatars/male2.png"),
  require("../../assets/avatars/male3.png"),
];

const femaleAvatars = [
  require("../../assets/avatars/female1.png"),
  require("../../assets/avatars/female2.png"),
  require("../../assets/avatars/female3.png"),
];

const neutralAvatar = require("../../assets/avatars/neutral.png");

function randomFrom<T>(list: T[], seed: string): T {
  let hash = 0;

  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }

  return list[Math.abs(hash) % list.length];
}

export function getProfileImage(profile: {
  id?: string;
  gender?: string;
  photoURL?: string;
}): ImageSourcePropType {
  if (
    profile.photoURL &&
    profile.photoURL.trim() !== ""
  ) {
    return {
      uri: profile.photoURL,
    };
  }

  const seed = profile.id ?? "default";

  switch ((profile.gender ?? "").toLowerCase()) {
    case "male":
      return randomFrom(maleAvatars, seed);

    case "female":
      return randomFrom(femaleAvatars, seed);

    default:
      return neutralAvatar;
  }
}