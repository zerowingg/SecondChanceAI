import { GLOBAL } from "../theme/styles";
import { getProfileImage } from "../utils/avatar";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../theme/colors";

import {
  getMatches,
  Match,
} from "../services/matches.service";

export default function MatchesScreen({
  navigation,
}: any) {
  const [matches, setMatches] =
    useState<Match[]>([]);

  useEffect(() => {
    loadMatches();
  }, []);

  async function loadMatches() {
    try {
      const data = await getMatches();
      setMatches(data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatTime(time: any) {
    if (!time?.toDate) return "";

    return time
      .toDate()
      .toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
  }

  function openChat(item: Match) {
    navigation.navigate("Chat", {
      user: item,
      matchId: item.matchId,
    });
  }

  function renderItem({
    item,
  }: {
    item: Match;
  }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.85}
        onPress={() => openChat(item)}
      >
        <View>
          <Image
            source={getProfileImage(item)}
            style={styles.avatar}
          />

          <View style={styles.onlineDot} />
        </View>

        <View style={styles.middle}>
          <Text style={styles.name}>
            {item.fullName}
          </Text>

          <Text
            style={styles.lastMessage}
            numberOfLines={1}
          >
            {item.lastMessage ||
              "Start your conversation ❤️"}
          </Text>
        </View>

        <View style={styles.right}>
          <Text style={styles.time}>
            {formatTime(item.lastMessageAt)}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      {/* Premium Header */}

      <View style={styles.headerCard}>
        <Text style={styles.title}>
          ❤️ Matches
        </Text>
      </View>

      {matches.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons
            name="heart-outline"
            size={85}
            color={COLORS.primary}
          />

          <Text style={styles.emptyTitle}>
            No Matches Yet
          </Text>

          <Text style={styles.emptySubtitle}>
            Keep discovering amazing
            people and start meaningful
            conversations.
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item) =>
            item.matchId
          }
          renderItem={renderItem}
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={{
            paddingBottom: 40,
          }}
        />
      )}
    </SafeAreaView>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:
        COLORS.background,
      padding: 20,
    },

    headerCard: {
      backgroundColor:
        COLORS.white,

      borderRadius: 24,

      borderWidth: 2,

      borderColor:
        COLORS.goldBorder,

      alignItems: "center",

      paddingVertical: 18,

      marginBottom: 22,

      shadowColor: "#000",

      shadowOpacity: 0.08,

      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 4,
      },

      elevation: 5,
    },

    title: {
      fontSize: 30,
      fontWeight: "800",
      color: COLORS.text,
    },

    empty: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",

      backgroundColor:
        COLORS.white,

      borderRadius: 26,

      borderWidth: 2,

      borderColor:
        COLORS.goldBorder,

      padding: 30,

      shadowColor: "#000",

      shadowOpacity: 0.08,

      shadowRadius: 10,

      shadowOffset: {
        width: 0,
        height: 5,
      },

      elevation: 5,
    },

    emptyTitle: {
      marginTop: 20,
      fontSize: 24,
      fontWeight: "700",
      color: COLORS.text,
    },

    emptySubtitle: {
      marginTop: 10,
      color: COLORS.subtitle,
      fontSize: 16,
      lineHeight: 26,
      textAlign: "center",
    },

    card: {
      flexDirection: "row",
      alignItems: "center",

      backgroundColor:
        COLORS.white,

      borderRadius: 22,

      borderWidth: 1.5,

      borderColor:
        COLORS.goldBorder,

      padding: 16,

      marginBottom: 16,

      shadowColor: "#000",

      shadowOpacity: 0.08,

      shadowRadius: 8,

      shadowOffset: {
        width: 0,
        height: 3,
      },

      elevation: 4,
    },

    avatar: {
      width: 64,
      height: 64,

      borderRadius: 32,

      borderWidth: 3,

      borderColor:
        COLORS.primary,
    },

    onlineDot: {
      position: "absolute",
      right: 2,
      bottom: 2,

      width: 14,
      height: 14,

      borderRadius: 7,

      backgroundColor:
        "#3DDC84",

      borderWidth: 2,
      borderColor: "#FFF",
    },

    middle: {
      flex: 1,
      marginLeft: 16,
    },

    name: {
      fontSize: 19,
      fontWeight: "700",
      color: COLORS.text,
    },

    lastMessage: {
      marginTop: 5,
      color: COLORS.subtitle,
      fontSize: 15,
    },

    right: {
      alignItems: "flex-end",
      justifyContent:
        "space-between",
      height: 46,
    },

    time: {
      fontSize: 12,
      color: COLORS.subtitle,
    },
  });