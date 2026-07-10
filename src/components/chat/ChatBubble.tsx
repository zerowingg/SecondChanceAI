import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../theme/colors";

interface Props {
  message: string;
  isMine: boolean;
  time?: string;
  seen?: boolean;
}

export default function ChatBubble({
  message,
  isMine,
  time,
  seen = false,
}: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.container,
        isMine
          ? styles.rightContainer
          : styles.leftContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMine
            ? styles.myBubble
            : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.message,
            isMine && styles.myMessage,
          ]}
        >
          {message}
        </Text>

        <View style={styles.bottomRow}>
          {time ? (
            <Text
              style={[
                styles.time,
                isMine && styles.myTime,
              ]}
            >
              {time}
            </Text>
          ) : null}

          {isMine && (
            <Ionicons
              name={
                seen
                  ? "checkmark-done"
                  : "checkmark"
              }
              size={14}
              color={
                seen
                  ? "#6EC6FF"
                  : "#F8F8F8"
              }
              style={styles.check}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    width: "100%",
    paddingHorizontal: 4,
  },

  leftContainer: {
    alignItems: "flex-start",
  },

  rightContainer: {
    alignItems: "flex-end",
  },

  bubble: {
    maxWidth: "82%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 22,
  },

  myBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 8,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  otherBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 8,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },

    elevation: 2,
  },

  message: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.text,
  },

  myMessage: {
    color: COLORS.white,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 6,
  },

  time: {
    fontSize: 11,
    color: COLORS.subtitle,
  },

  myTime: {
    color: "#F5F5F5",
  },

  check: {
    marginLeft: 5,
  },
});