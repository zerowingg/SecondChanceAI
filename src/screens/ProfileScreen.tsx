import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";
import { getCurrentUser } from "../services/user.service";
import { UserProfile } from "../types/user";
import { COLORS } from "../theme/colors";

export default function ProfileScreen({
  navigation,
}: any) {
  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const profile =
      await getCurrentUser();

    setUser(profile);
    setLoading(false);
  }

  async function handleLogout() {
    await signOut(auth);

    navigation.reset({
      index: 0,
      routes: [
        {
          name: "Welcome",
        },
      ],
    });
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator
          size="large"
          color={COLORS.primary}
        />
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>
          Unable to load profile.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Image
          source={{
            uri:
              user.photoURL ||
              "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>
          {user.fullName}
        </Text>

        <Text style={styles.subtitle}>
          {user.occupation}
          {" • "}
          {user.city}
        </Text>

        <View style={styles.card}>
          <Text style={styles.heading}>
            About
          </Text>

          <Text style={styles.value}>
            {user.bio || "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Basic Information
          </Text>

          <Text style={styles.value}>
            Age : {user.age}
          </Text>

          <Text style={styles.value}>
            Gender : {user.gender}
          </Text>

          <Text style={styles.value}>
            User Type :{" "}
            {user.userType}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Interests
          </Text>

          <Text style={styles.value}>
            {user.interests?.length
              ? user.interests.join(", ")
              : "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Relationship Goals
          </Text>

          <Text style={styles.value}>
            {user.goals?.length
              ? user.goals.join(", ")
              : "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Lifestyle
          </Text>

          <Text style={styles.value}>
            Personality :{" "}
            {user.lifestyle?.personality ||
              "-"}
          </Text>

          <Text style={styles.value}>
            Smoking :{" "}
            {user.lifestyle?.smoking ||
              "-"}
          </Text>

          <Text style={styles.value}>
            Drinking :{" "}
            {user.lifestyle?.drinking ||
              "-"}
          </Text>

          <Text style={styles.value}>
            Children :{" "}
            {user.lifestyle?.children ||
              "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Values
          </Text>

          <Text style={styles.value}>
            {user.values?.length
              ? user.values.join(", ")
              : "-"}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>
            Languages
          </Text>

          <Text style={styles.value}>
            {user.languages?.length
              ? user.languages.join(", ")
              : "-"}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text
            style={
              styles.logoutText
            }
          >
            Logout
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
    },

    center: {
      flex: 1,
      justifyContent:
        "center",
      alignItems: "center",
      backgroundColor:
        COLORS.background,
    },

    content: {
      padding: 20,
      paddingBottom: 40,
    },

    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      alignSelf: "center",
      marginTop: 10,
    },

    name: {
      marginTop: 15,
      textAlign: "center",
      fontSize: 28,
      fontWeight: "700",
      color: COLORS.text,
    },

    subtitle: {
      textAlign: "center",
      color: COLORS.subtitle,
      marginTop: 5,
      marginBottom: 20,
    },

    card: {
      backgroundColor:
        COLORS.white,
      borderRadius: 18,
      padding: 18,
      marginBottom: 15,
    },

    heading: {
      fontSize: 18,
      fontWeight: "700",
      marginBottom: 10,
      color: COLORS.text,
    },

    value: {
      color: COLORS.subtitle,
      lineHeight: 24,
    },

    logoutButton: {
      marginTop: 15,
      backgroundColor:
        "#E53935",
      paddingVertical: 16,
      borderRadius: 30,
      alignItems: "center",
    },

    logoutText: {
      color: "#fff",
      fontWeight: "700",
      fontSize: 17,
    },
  });