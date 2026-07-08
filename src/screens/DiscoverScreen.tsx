import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import ProfileCard from "../components/discover/ProfileCard";
import ActionButtons from "../components/discover/ActionButtons";

import { COLORS } from "../theme/colors";

import {
  getCurrentUser,
  getDiscoverProfiles,
} from "../services/user.service";

import { likeUser } from "../services/like.service";

import { UserProfile } from "../types/user";

export default function DiscoverScreen() {
  const [currentUser, setCurrentUser] =
    useState<UserProfile | null>(null);

  const [profiles, setProfiles] =
    useState<UserProfile[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const me = await getCurrentUser();
    const users = await getDiscoverProfiles();

    setCurrentUser(me);
    setProfiles(users);
  };

  const nextProfile = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      Alert.alert(
        "Finished",
        "No more profiles available."
      );
    }
  };

  const currentProfile = profiles[currentIndex];

  const handleLike = async () => {
    if (!currentProfile) return;

    try {
      const matched = await likeUser(
        currentProfile.id
      );

      if (matched) {
        Alert.alert(
          "🎉 It's a Match!",
          `You and ${currentProfile.fullName} liked each other.`
        );
      }

      nextProfile();
    } catch (error) {
      console.log(error);
    }
  };

  const handlePass = () => {
    nextProfile();
  };

  if (!currentUser) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <Text style={styles.emptyText}>
          Loading your profile...
        </Text>
      </SafeAreaView>
    );
  }

  if (!currentProfile) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <Text style={styles.emptyText}>
          No profiles available.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProfileCard
          currentUser={currentUser}
          profile={currentProfile}
        />

        <ActionButtons
          onLike={handleLike}
          onPass={handlePass}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  emptyText: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 18,
    color: COLORS.subtitle,
    marginTop: 100,
  },
});