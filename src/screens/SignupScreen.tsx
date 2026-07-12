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
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../firebase/config";

import Logo from "../components/Logo";
import ScreenHeader from "../components/ScreenHeader";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverlay";

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

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [
    acceptedTerms,
    setAcceptedTerms,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const [
    welcomeMode,
    setWelcomeMode,
  ] = useState(false);

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

    if (!acceptedTerms) {
      Alert.alert(
        "Terms Required",
        "Please accept the Terms & Conditions and Privacy Policy."
      );
      return;
    }

    setLoading(true);

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

          interestedIn: "",

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

      setWelcomeMode(true);

      setTimeout(() => {
        setLoading(false);

        navigation.replace(
          "UserType"
        );
      }, 1800);
    } catch (error: any) {
      setLoading(false);
      setWelcomeMode(false);

      console.log(error);

      Alert.alert(
        "Signup Failed",
        error.message
      );
    }
  };
    return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Logo />

      <ScreenHeader
        title="Create Account"
        subtitle="Start your new journey with SecondChance AI."
      />

      <Input
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
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

      <Input
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <TouchableOpacity
        style={[
          styles.button,
          loading && styles.buttonDisabled,
        ]}
        onPress={handleSignup}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          Create Account
        </Text>
      </TouchableOpacity>

      {/* Terms & Privacy */}

      <TouchableOpacity
        style={styles.termsContainer}
        onPress={() =>
          setAcceptedTerms(!acceptedTerms)
        }
        activeOpacity={0.8}
      >
        <Text style={styles.checkbox}>
          {acceptedTerms ? "☑" : "☐"}
        </Text>

        <Text style={styles.termsText}>
          I agree to the{" "}
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("Terms")
            }
          >
            Terms & Conditions
          </Text>{" "}
          and{" "}
          <Text
            style={styles.link}
            onPress={() =>
              navigation.navigate("Privacy")
            }
          >
            Privacy Policy
          </Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        disabled={loading}
        onPress={() =>
          navigation.navigate("Login")
        }
      >
        <Text style={styles.login}>
          Already have an account?{" "}
          <Text style={styles.loginBold}>
            Login
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

  termsContainer: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  checkbox: {
    fontSize: 22,
    color: COLORS.primary,
    marginRight: 10,
  },

  termsText: {
    flex: 1,
    color: COLORS.subtitle,
    fontSize: 14,
    lineHeight: 22,
  },

  link: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  login: {
    marginTop: 25,
    textAlign: "center",
    color: COLORS.subtitle,
    fontSize: 16,
  },

  loginBold: {
    color: COLORS.primary,
    fontWeight: "700",
  },
});