import { StyleSheet, Text, View } from "react-native";

import { COLORS } from "../../theme/colors";

interface Props {
  score: number;
}

export default function MatchBadge({
  score,
}: Props) {
  const getBadgeColor = () => {
    if (score >= 90) return "#22C55E";
    if (score >= 75) return "#3B82F6";
    if (score >= 60) return "#F59E0B";

    return "#EF4444";
  };

  const getTitle = () => {
    if (score >= 90) return "Excellent Match";
    if (score >= 75) return "Great Match";
    if (score >= 60) return "Good Match";

    return "Low Match";
  };

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: getBadgeColor(),
        },
      ]}
    >
      <Text
        style={[
          styles.score,
          {
            color: getBadgeColor(),
          },
        ]}
      >
        {score}%
      </Text>

      <Text style={styles.title}>
        {getTitle()}
      </Text>

      <Text style={styles.subtitle}>
        AI Compatibility
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 18,
    alignSelf: "flex-start",
    backgroundColor: COLORS.white,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 18,
    borderWidth: 2,
  },

  score: {
    fontSize: 30,
    fontWeight: "800",
  },

  title: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 2,
    color: COLORS.subtitle,
    fontSize: 13,
  },
});