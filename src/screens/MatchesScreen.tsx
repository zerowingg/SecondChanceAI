import { getProfileImage } from "../utils/avatar";
import { StatusBar } from "expo-status-bar";
import React, {
  useEffect,
  useState,
} from "react";

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
      const data =
        await getMatches();

      setMatches(data);
    } catch (error) {
      console.log(error);
    }
  }

  function formatTime(time: any) {
    if (!time?.toDate)
      return "";

    const date =
      time.toDate();

    return date.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  }

  function openChat(
    item: Match
  ) {
    navigation.navigate(
      "Chat",
      {
        user: item,
        matchId:
          item.matchId,
      }
    );
  }

  function renderItem({
    item,
  }: {
    item: Match;
  }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          openChat(item)
        }
      >
        <View>
          <Image
  source={getProfileImage(item)}
  style={styles.avatar}
/>

          {/* Online indicator (UI Ready) */}

          <View
            style={
              styles.onlineDot
            }
          />
        </View>

        <View
          style={
            styles.middle
          }
        >
          <Text
            style={
              styles.name
            }
          >
            {item.fullName}
          </Text>

          <Text
            style={
              styles.lastMessage
            }
            numberOfLines={
              1
            }
          >
            {item.lastMessage ||
              "Start your conversation ❤️"}
          </Text>
        </View>

        <View
          style={
            styles.right
          }
        >
          <Text
            style={
              styles.time
            }
          >
            {formatTime(
              item.lastMessageAt
            )}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={18}
            color="#BDBDBD"
          />
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView
      style={
        styles.container
      }
    >
      <StatusBar
        style="dark"
      />

      <Text
        style={
          styles.title
        }
      >
        ❤️ Matches
      </Text>

      {matches.length ===
      0 ? (
        <View
          style={
            styles.empty
          }
        >
          <Ionicons
            name="heart-outline"
            size={80}
            color="#D0D0D0"
          />

          <Text
            style={
              styles.emptyTitle
            }
          >
            No Matches Yet
          </Text>

          <Text
            style={
              styles.emptySubtitle
            }
          >
            Keep discovering
            amazing people.
          </Text>
        </View>
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(
            item
          ) =>
            item.matchId
          }
          renderItem={
            renderItem
          }
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

    title: {
      fontSize: 30,
      fontWeight:
        "700",
      color:
        COLORS.text,
      marginBottom: 20,
    },

    empty: {
      flex: 1,
      justifyContent:
        "center",
      alignItems:
        "center",
    },

    emptyTitle: {
      marginTop: 20,
      fontSize: 24,
      fontWeight:
        "700",
      color:
        COLORS.text,
    },

    emptySubtitle: {
      marginTop: 8,
      color:
        COLORS.subtitle,
      fontSize: 16,
      textAlign:
        "center",
    },

    card: {
      flexDirection:
        "row",
      alignItems:
        "center",
      backgroundColor:
        COLORS.white,
      borderRadius: 18,
      padding: 15,
      marginBottom: 14,

      shadowColor:
        "#000",
      shadowOpacity:
        0.05,
      shadowRadius: 5,
      shadowOffset: {
        width: 0,
        height: 2,
      },

      elevation: 2,
    },

    avatar: {
      width: 62,
      height: 62,
      borderRadius: 31,
    },

    onlineDot: {
      position:
        "absolute",
      right: 2,
      bottom: 2,

      width: 14,
      height: 14,

      borderRadius: 7,

      backgroundColor:
        "#3DDC84",

      borderWidth: 2,
      borderColor:
        "#FFF",
    },

    middle: {
      flex: 1,
      marginLeft: 15,
    },

    name: {
      fontSize: 18,
      fontWeight:
        "700",
      color:
        COLORS.text,
    },

    lastMessage: {
      marginTop: 4,
      color:
        COLORS.subtitle,
      fontSize: 14,
    },

    right: {
      alignItems:
        "flex-end",
      justifyContent:
        "space-between",
      height: 45,
    },

    time: {
      fontSize: 12,
      color:
        COLORS.subtitle,
    },
  });