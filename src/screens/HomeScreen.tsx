import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";
import { COLORS } from "../theme/colors";

export default function HomeScreen({ navigation }: any) {
  const handleLogout = async () => {
    try {
      await signOut(auth);

      navigation.replace("Login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>
        🎉 Welcome to SecondChance AI
      </Text>

      <Text style={styles.subtitle}>
        Authentication Successful
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>
          Logout
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
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 18,
    color: COLORS.subtitle,
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 40,
    paddingVertical: 16,
    borderRadius: 30,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});