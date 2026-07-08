import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";
import { UserProfile } from "../../types/user";

interface Props {
  profile: UserProfile;
}

export default function AIInsightCard({
  profile,
}: Props) {
  const insight = generateInsight(profile);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🤖 AI Insight
      </Text>

      <Text style={styles.text}>
        {insight}
      </Text>
    </View>
  );
}

function generateInsight(profile: UserProfile) {
  const interests = profile.interests?.slice(0, 2).join(", ");

  return `Based on your profile, ${profile.fullName} appears to value meaningful relationships, emotional maturity and long-term compatibility. Shared interests like ${interests || "common values"} may help build a stronger connection.`;
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#ECECEC",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  text: {
    marginTop: 12,
    color: COLORS.subtitle,
    lineHeight: 24,
    fontSize: 15,
  },
});