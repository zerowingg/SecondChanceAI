import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../theme/colors";

type Props = {
  title: string;
  subtitle: string;
  step: number;
  totalSteps: number;

  backScreen?: string;
};

export default function ProgressHeader({
  title,
  subtitle,
  step,
  totalSteps,
  backScreen,
}: Props) {
  const navigation = useNavigation<any>();

  const progress =
    (step / totalSteps) * 100;

  return (
    <View style={styles.container}>

      {/* Back Button */}

      <TouchableOpacity
        style={styles.backButton}
        activeOpacity={0.8}
        onPress={() => {
  if (backScreen) {
    navigation.navigate(backScreen);
  } else {
    navigation.goBack();
  }
}}
      >
        <Ionicons
          name="arrow-back"
          size={22}
          color={COLORS.primary}
        />
      </TouchableOpacity>

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

  backButton: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: COLORS.white,

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 18,

    borderWidth: 1,
    borderColor: COLORS.goldBorder,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
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