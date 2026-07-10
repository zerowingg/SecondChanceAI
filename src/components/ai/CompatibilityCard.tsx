import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";

import { CompatibilityResult } from "../../ai/models/compatibility";

interface Props {
  result: CompatibilityResult;
}

export default function CompatibilityCard({
  result,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        ❤️ AI Compatibility
      </Text>

      <Text style={styles.score}>
        {result.score}%
      </Text>

      <Text style={styles.summary}>
        {result.summary}
      </Text>

      <Text style={styles.heading}>
        Green Flags
      </Text>

      {result.greenFlags.map(
        (item, index) => (
          <Text
            key={index}
            style={styles.item}
          >
            ✔ {item}
          </Text>
        )
      )}

      <Text style={styles.heading}>
        Growth Areas
      </Text>

      {result.redFlags.map(
        (item, index) => (
          <Text
            key={index}
            style={styles.item}
          >
            ⚠ {item}
          </Text>
        )
      )}

      <Text style={styles.heading}>
        AI Icebreaker
      </Text>

      <Text style={styles.icebreaker}>
        "{result.iceBreaker}"
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 24,
    padding: 20,
    marginVertical: 15,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: COLORS.text,
  },

  score: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 10,
  },

  summary: {
    marginTop: 8,
    color: COLORS.subtitle,
    lineHeight: 22,
  },

  heading: {
    marginTop: 20,
    fontWeight: "700",
    fontSize: 17,
    color: COLORS.text,
  },

  item: {
    marginTop: 8,
    color: COLORS.subtitle,
    fontSize: 15,
  },

  icebreaker: {
    marginTop: 10,
    fontStyle: "italic",
    color: COLORS.primary,
    fontSize: 16,
  },
});