import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Logo from "../components/Logo";
import { COLORS } from "../theme/colors";
import { STRINGS } from "../constants/strings";
import { auth, db } from "../firebase/config";

export default function SplashScreen() {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setTimeout(async () => {
        if (!user) {
          navigation.replace("Welcome");
          return;
        }

        try {
          const snapshot = await getDoc(
            doc(db, "users", user.uid)
          );

          if (!snapshot.exists()) {
            navigation.replace("UserType");
            return;
          }

          const data = snapshot.data();

          console.log("PROFILE:", data);

          if (data.profileCompleted) {
            navigation.replace("Main");
          } else {
            navigation.replace("UserType");
          }
        } catch (error) {
          console.log(error);
          navigation.replace("Welcome");
        }
      }, 1500);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Logo />

      <Text style={styles.title}>
        {STRINGS.appName}
      </Text>

      <Text style={styles.subtitle}>
        {STRINGS.tagline}
      </Text>

      <Text style={styles.loading}>
        Initializing AI...
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 20,
  },

  subtitle: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginTop: 10,
    textAlign: "center",
  },

  loading: {
    marginTop: 60,
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 15,
  },
});