import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from "../components/Logo";
import { COLORS } from "../theme/colors";

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.heroCard}>
        <Logo />

        <Text style={styles.title}>
          Welcome to{"\n"}SecondChance AI
        </Text>

        <Text style={styles.subtitle}>
          Find meaningful connections built on trust,
          respect and second chances.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate("Login")
          }
        >
          <Text style={styles.buttonText}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  heroCard: {
    width: "100%",

    backgroundColor: COLORS.white,

    borderRadius: 30,

    borderWidth: 2,
    borderColor: COLORS.goldBorder,

    paddingVertical: 40,
    paddingHorizontal: 28,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  title: {
    marginTop: 22,

    fontSize: 36,

    fontWeight: "800",

    letterSpacing: 0.5,

    textAlign: "center",

    color: COLORS.text,
  },

  subtitle: {
    marginTop: 18,

    marginBottom: 35,

    textAlign: "center",

    color: COLORS.subtitle,

    fontSize: 17,

    lineHeight: 28,
  },

  button: {
    width: "100%",

    backgroundColor: COLORS.primary,

    borderRadius: 30,

    borderWidth: 2,
    borderColor: "#E8C95A",

    paddingVertical: 18,

    alignItems: "center",

    shadowColor: COLORS.primary,

    shadowOpacity: 0.35,

    shadowRadius: 12,

    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  buttonText: {
    color: COLORS.white,

    fontWeight: "800",

    fontSize: 19,
  },
});