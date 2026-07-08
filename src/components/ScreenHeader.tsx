import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type Props = {
  title: string;
  subtitle: string;
};

export default function ScreenHeader({
  title,
  subtitle,
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 35,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    fontSize: 16,
    color: COLORS.subtitle,
    textAlign: "center",
    lineHeight: 24,
  },
});