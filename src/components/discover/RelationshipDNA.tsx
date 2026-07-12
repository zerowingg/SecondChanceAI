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

export default function RelationshipDNA({
  profile,
}: Props) {
  const values = calculate(profile.values?.length, 5);
  const goals = calculate(profile.goals?.length, 5);
  const lifestyle = calculate(
  Object.values(profile.lifestyle).length,
  4
);
  const communication = calculate(profile.languages?.length, 4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        🧬 Relationship DNA
      </Text>

      <Text style={styles.item}>
        ❤️ Values: {values}%
      </Text>

      <Text style={styles.item}>
        🎯 Goals: {goals}%
      </Text>

      <Text style={styles.item}>
        🌍 Lifestyle: {lifestyle}%
      </Text>

      <Text style={styles.item}>
        💬 Communication: {communication}%
      </Text>
    </View>
  );
}

function calculate(selected = 0, total = 5) {
  return Math.round((selected / total) * 100);
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
    marginBottom: 12,
  },

  item: {
    fontSize: 15,
    color: COLORS.subtitle,
    marginBottom: 8,
  },
});