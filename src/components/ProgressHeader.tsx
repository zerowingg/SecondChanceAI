import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../theme/colors";

type Props = {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;
};

export default function ProgressHeader({
  title,
  subtitle,
  step,
  totalSteps,
}: Props) {
  const progress = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
      <Text style={styles.step}>
        Step {step} of {totalSteps}
      </Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.title}>
        {title}
      </Text>

      <Text style={styles.subtitle}>
        {subtitle}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },

  step: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 12,
  },

  progressBackground: {
    height: 8,
    borderRadius: 10,
    backgroundColor: "#ECECEC",
    overflow: "hidden",
    marginBottom: 24,
  },

  progressFill: {
    height: 8,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 10,
    color: COLORS.subtitle,
    fontSize: 16,
    lineHeight: 24,
  },
});