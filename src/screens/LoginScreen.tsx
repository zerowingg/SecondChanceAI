import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import Logo from "../components/Logo";
import ScreenHeader from "../components/ScreenHeader";
import Input from "../components/Input";

import { COLORS } from "../theme/colors";
import { auth, db } from "../firebase/config";

export default function LoginScreen({
  navigation,
}: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    try {
      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      console.log("==================================");
      console.log("LOGIN SUCCESS");
      console.log("UID:", credential.user.uid);
      console.log("==================================");

      const userRef = doc(
        db,
        "users",
        credential.user.uid
      );

      const snapshot = await getDoc(userRef);

      if (!snapshot.exists()) {
        console.log("User document not found.");

        navigation.replace("UserType");
        return;
      }

      const data = snapshot.data();

      console.log("Firestore User:", data);
      console.log(
        "profileCompleted:",
        data.profileCompleted
      );

      if (data.profileCompleted === true) {
        navigation.replace("Main");
      } else {
        navigation.replace("UserType");
      }
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Login Failed",
        error.message
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Logo />

      <ScreenHeader
        title="Welcome Back"
        subtitle="Login to continue your journey."
      />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <Input
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Signup")
        }
      >
        <Text style={styles.signup}>
          Don't have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
  },

  button: {
    marginTop: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },

  signup: {
    marginTop: 25,
    textAlign: "center",
    color: COLORS.subtitle,
    fontSize: 16,
  },
});