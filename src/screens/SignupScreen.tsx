import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

import Logo from "../components/Logo";
import ScreenHeader from "../components/ScreenHeader";
import Input from "../components/Input";

import { COLORS } from "../theme/colors";

export default function SignupScreen({
  navigation,
}: any) {
  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const handleSignup = async () => {
    if (
      !fullName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please fill all fields."
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Password Mismatch",
        "Passwords do not match."
      );
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        "Weak Password",
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      const credential =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await updateProfile(
        credential.user,
        {
          displayName:
            fullName.trim(),
        }
      );

      await setDoc(
        doc(
          db,
          "users",
          credential.user.uid
        ),
        {
          uid: credential.user.uid,

          email:
            email.trim(),

          fullName:
            fullName.trim(),

          createdAt:
            serverTimestamp(),

          userType: "",

          age: "",

          gender: "",

          city: "",

          occupation: "",

          bio: "",

          interests: [],

          goals: [],

          lifestyle: [],

          values: [],

          languages: [],

          aiAnswers: [],

          photoURL: "",

          profileCompleted: false,
        }
      );

      Alert.alert(
        "Welcome 🎉",
        "Let's build your profile.",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.replace(
                "UserType"
              ),
          },
        ]
      );
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Signup Failed",
        error.message
      );
    }
  };

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      <Logo />

      <ScreenHeader
        title="Create Account"
        subtitle="Start your new journey with SecondChance AI."
      />

      <Input
        placeholder="Full Name"
        value={fullName}
        onChangeText={
          setFullName
        }
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
        onChangeText={
          setPassword
        }
      />

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={
          setConfirmPassword
        }
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
      >
        <Text
          style={styles.buttonText}
        >
          Create Account
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() =>
          navigation.navigate(
            "Login"
          )
        }
      >
        <Text style={styles.login}>
          Already have an account?
          Login
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
      padding: 24,
      justifyContent:
        "center",
    },

    button: {
      marginTop: 20,
      backgroundColor:
        COLORS.primary,
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: "center",
    },

    buttonText: {
      color: COLORS.white,
      fontSize: 18,
      fontWeight: "700",
    },

    login: {
      marginTop: 25,
      textAlign: "center",
      color: COLORS.subtitle,
      fontSize: 16,
    },
  });