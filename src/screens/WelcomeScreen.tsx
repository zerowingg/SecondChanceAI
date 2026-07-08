import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Logo from "../components/Logo";
import { COLORS } from "../theme/colors";

export default function WelcomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

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
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>
          Get Started
        </Text>
      </TouchableOpacity>
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

  title: {
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    color: COLORS.text,
    marginTop: 20,
  },

  subtitle: {
    marginTop: 15,
    textAlign: "center",
    color: COLORS.subtitle,
    lineHeight: 26,
    fontSize: 17,
    marginBottom: 45,
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 18,
  },
});