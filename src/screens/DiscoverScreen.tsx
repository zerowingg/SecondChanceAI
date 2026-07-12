import { StatusBar } from "expo-status-bar";
import React, {
  useEffect,
  useState,
} from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

import { useNavigation } from "@react-navigation/native";

import ProfileCard from "../components/discover/ProfileCard";
import ActionButtons from "../components/discover/ActionButtons";
import AIAnalyzeButton from "../components/discover/AIAnalyzeButton";
import LoadingAnalysis from "../components/discover/LoadingAnalysis";
import RelationshipDNACard from "../components/discover/RelationshipDNACard";

import { COLORS } from "../theme/colors";

import {
  getCurrentUser,
  getDiscoverProfiles,
} from "../services/user.service";

import { likeUser } from "../services/like.service";

import { generateCompatibility } from "../ai/compatibility.service";
import { generateBlueprint } from "../ai/blueprint.service";

import { UserProfile } from "../types/user";

import { CompatibilityResult } from "../ai/models/compatibility";
import { RelationshipBlueprint } from "../ai/models/blueprint";
import { saveCoachResult } from "../services/coachStore";

export default function DiscoverScreen() {
  const navigation = useNavigation<any>();

  const [currentUser, setCurrentUser] =
    useState<UserProfile | null>(null);

  const [profiles, setProfiles] =
    useState<UserProfile[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [loadingAI, setLoadingAI] =
    useState(false);

  const [compatibility, setCompatibility] =
    useState<CompatibilityResult | null>(null);

  const [blueprint, setBlueprint] =
    useState<RelationshipBlueprint | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    const me = await getCurrentUser();

    const users =
      await getDiscoverProfiles();

    setCurrentUser(me);

    setProfiles(users);
  }

  const profile = profiles[currentIndex];

  async function runAIScan() {
    if (!currentUser || !profile)
      return;

    try {
      setLoadingAI(true);

      setCompatibility(null);

      setBlueprint(null);

      const compatibilityResult =
        await generateCompatibility(
          currentUser,
          profile
        );

      const blueprintResult =
        await generateBlueprint(
          currentUser,
          profile
        );
        saveCoachResult(
  compatibilityResult,
  blueprintResult
);

      setCompatibility(
        compatibilityResult
      );

      setBlueprint(
        blueprintResult
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "AI Error",
        "Unable to analyze this profile."
      );
    } finally {
      setLoadingAI(false);
    }
  }

  function nextProfile() {
    setCompatibility(null);

    setBlueprint(null);

    if (
      currentIndex <
      profiles.length - 1
    ) {
      setCurrentIndex(
        (prev) => prev + 1
      );
    } else {
      Alert.alert(
        "Finished",
        "No more profiles available."
      );
    }
  }

  async function handleLike() {
    if (!profile) return;

    const matched =
      await likeUser(profile.id);

    if (matched) {
      Alert.alert(
        "🎉 It's a Match!",
        `You and ${profile.fullName} liked each other.`,
        [
          {
            text: "View Matches",

            onPress: () =>
              navigation.navigate(
                "Main",
                {
                  screen: "Matches",
                }
              ),
          },

          {
            text: "Keep Swiping",

            onPress: nextProfile,
          },
        ]
      );

      return;
    }

    nextProfile();
  }

  function handlePass() {
    nextProfile();
  }

  if (!currentUser) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar style="dark" />

        <Text style={styles.empty}>
          Loading profile...
        </Text>
      </SafeAreaView>
    );
  }

  if (!profile) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar style="dark" />

        <Text style={styles.empty}>
          No profiles found.
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
          profile={profile}
        />

        <AIAnalyzeButton
          loading={loadingAI}
          onPress={runAIScan}
        />

        {loadingAI && (
          <LoadingAnalysis />
        )}

        {!loadingAI &&
          compatibility &&
          blueprint && (
            <RelationshipDNACard
              compatibility={
                compatibility
              }
              blueprint={blueprint}
            />
          )}

        <ActionButtons
          onLike={handleLike}
          onPass={handlePass}
        />
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

    content: {
      padding: 20,
      paddingBottom: 40,
    },

    empty: {
      flex: 1,

      textAlign: "center",

      textAlignVertical:
        "center",

      fontSize: 18,

      color: COLORS.subtitle,

      marginTop: 120,
    },
  });