import React from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "../../theme/colors";

interface Props {
  loading: boolean;
  onPress: () => void;
}

export default function AIAnalyzeButton({
  loading,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator
          color={COLORS.white}
        />
      ) : (
        <Text style={styles.text}>
          ✨ Analyze With AI
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,

    marginTop: 20,

    marginBottom: 20,

    borderRadius: 20,

    height: 58,

    justifyContent: "center",

    alignItems: "center",

    elevation: 4,
  },

  text: {
    color: COLORS.white,

    fontSize: 17,

    fontWeight: "700",
  },
});