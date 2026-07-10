import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../theme/colors";

interface Props {
  onSend: (message: string) => void;
}

export default function MessageInput({
  onSend,
}: Props) {
  const [message, setMessage] =
    useState("");

  function handleSend() {
    const trimmed =
      message.trim();

    if (!trimmed) return;

    onSend(trimmed);

    setMessage("");
  }

  return (
    <View style={styles.container}>
      {/* Emoji */}

      <TouchableOpacity
        style={styles.iconButton}
      >
        <Ionicons
          name="happy-outline"
          size={26}
          color={COLORS.subtitle}
        />
      </TouchableOpacity>

      {/* Input */}

      <TextInput
        style={styles.input}
        placeholder="Message..."
        placeholderTextColor={
          COLORS.subtitle
        }
        value={message}
        onChangeText={setMessage}
        multiline
      />

      {/* Attachment */}

      <TouchableOpacity
        style={styles.iconButton}
      >
        <Ionicons
          name="attach"
          size={24}
          color={COLORS.subtitle}
        />
      </TouchableOpacity>

      {/* Camera */}

      <TouchableOpacity
        style={styles.iconButton}
      >
        <Ionicons
          name="camera-outline"
          size={24}
          color={COLORS.subtitle}
        />
      </TouchableOpacity>

      {/* Voice / Send */}

      {message.trim().length === 0 ? (
        <TouchableOpacity
          style={styles.voiceButton}
        >
          <Ionicons
            name="mic"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Ionicons
            name="send"
            size={20}
            color="#fff"
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles =
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor:
        COLORS.white,
      borderTopWidth: 1,
      borderTopColor: "#ECECEC",
    },

    input: {
      flex: 1,
      minHeight: 46,
      maxHeight: 120,

      backgroundColor:
        "#F5F5F5",

      borderRadius: 25,

      paddingHorizontal: 18,
      paddingVertical: 10,

      color: COLORS.text,

      fontSize: 16,
    },

    iconButton: {
      width: 40,
      height: 40,

      justifyContent:
        "center",

      alignItems: "center",
    },

    sendButton: {
      width: 46,
      height: 46,

      borderRadius: 23,

      backgroundColor:
        COLORS.primary,

      justifyContent:
        "center",

      alignItems: "center",

      marginLeft: 5,
    },

    voiceButton: {
      width: 46,
      height: 46,

      borderRadius: 23,

      backgroundColor:
        "#2196F3",

      justifyContent:
        "center",

      alignItems: "center",

      marginLeft: 5,
    },
  });