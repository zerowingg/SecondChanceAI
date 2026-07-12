import { StyleSheet } from "react-native";

import { COLORS } from "./colors";

export const GLOBAL = StyleSheet.create({
  premiumCard: {
    backgroundColor: COLORS.white,

    borderRadius: 24,

    borderWidth: 1,

    borderColor: COLORS.premiumBorder,

    shadowColor: "#000",

    shadowOpacity: 0.08,

    shadowRadius: 10,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  premiumButton: {
    backgroundColor: COLORS.primary,

    borderRadius: 30,

    borderWidth: 1,

    borderColor: COLORS.premiumBorderDark,

    shadowColor: "#000",

    shadowOpacity: 0.15,

    shadowRadius: 8,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  premiumInput: {
    borderWidth: 1,

    borderColor: COLORS.inputBorder,

    borderRadius: 18,

    backgroundColor: COLORS.white,
  },

  avatarBorder: {
    borderWidth: 4,

    borderColor: COLORS.primary,
  },
});