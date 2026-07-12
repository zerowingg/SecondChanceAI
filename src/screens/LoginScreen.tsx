import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";

import {
  doc,
  getDoc,
} from "firebase/firestore";

import Logo from "../components/Logo";
import ScreenHeader from "../components/ScreenHeader";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";

import {
  auth,
  db,
} from "../firebase/config";

import { COLORS } from "../theme/colors";

export default function LoginScreen({
  navigation,
}: any) {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

    const [welcomeMode, setWelcomeMode] =
  useState(false);

  const handleLogin = async () => {
    if (
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please enter your email and password."
      );
      return;
    }

    setLoading(true);

    try {
      const credential =
        await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      const snapshot =
        await getDoc(
          doc(
            db,
            "users",
            credential.user.uid
          )
        );

      if (!snapshot.exists()) {
        setLoading(false);

        navigation.replace(
          "UserType"
        );

        return;
      }

      const data =
        snapshot.data();

      setLoading(false);

      if (
        data.profileCompleted === true
      ) {
        navigation.replace(
          "Main"
        );
      } else {
        navigation.replace(
          "UserType"
        );
      }
    } catch (error: any) {
      setLoading(false);

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
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={loading}
        onPress={() =>
          navigation.navigate("Signup")
        }
      >
        <Text style={styles.signup}>
          Don't have an account?{" "}
          <Text style={styles.signupBold}>
            Sign Up
          </Text>
        </Text>
      </TouchableOpacity>

      <LoadingOverlay
  visible={loading}
  icon={
    welcomeMode
      ? "heart"
      : "shield-checkmark"
  }
  title={
    welcomeMode
      ? "Welcome to SecondChance AI"
      : "Creating your account..."
  }
  messages={
    welcomeMode
      ? [
          "Building your personalized AI experience...",
          "Preparing your onboarding...",
          "Because Everyone Deserves A Second Chance.",
        ]
      : [
          "Encrypting your information...",
          "Saving your profile...",
          "Preparing your AI experience...",
          "Almost there...",
        ]
  }
/>
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

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  buttonDisabled: {
    opacity: 0.7,
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

  signupBold: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});