import { StatusBar } from "expo-status-bar";
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { auth } from "../firebase/config";

import {
  ChatMessage,
  sendMessage,
  subscribeToMessages,
  subscribeTyping,
} from "../services/chat.service";

import ChatBubble from "../components/chat/ChatBubble";
import MessageInput from "../components/chat/MessageInput";

import { COLORS } from "../theme/colors";

export default function ChatScreen({
  navigation,
  route,
}: any) {
  const { user, matchId } = route.params;

  const [messages, setMessages] =
    useState<ChatMessage[]>([]);

  const [typingUsers, setTypingUsers] =
    useState<any>({});

  const flatListRef =
    useRef<FlatList<ChatMessage>>(null);

  useEffect(() => {
    const unsubscribeToMessages =
      subscribeToMessages(
        matchId,
        (data) => {
          setMessages(data);

          setTimeout(() => {
            flatListRef.current?.scrollToEnd({
              animated: true,
            });
          }, 100);
        }
      );

    const unsubscribeTyping =
      subscribeTyping(
        matchId,
        (typing) => {
          setTypingUsers(typing);
        }
      );

    return () => {
      unsubscribeToMessages();
      unsubscribeTyping();
    };
  }, []);

  async function handleSend(
    text: string
  ) {
    await sendMessage(matchId, text);
  }

  const otherTyping =
    Object.entries(typingUsers).find(
      ([id, value]) =>
        id !== auth.currentUser?.uid &&
        value === true
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      {/* HEADER */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            navigation.goBack()
          }
        >
          <Ionicons
            name="arrow-back"
            size={26}
            color="#111"
          />
        </TouchableOpacity>

        <Image
          source={{
            uri:
              user.photoURL ||
              "https://i.pravatar.cc/300",
          }}
          style={styles.avatar}
        />

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>
            {user.fullName}
          </Text>

          <Text
            style={styles.status}
          >
            {otherTyping
              ? "Typing..."
              : "Online"}
          </Text>
        </View>

        <TouchableOpacity>
          <Ionicons
            name="call-outline"
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      {/* CHAT */}

      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          styles.messages
        }
        renderItem={({ item }) => (
          <ChatBubble
            message={item.text}
            isMine={
              item.senderId ===
              auth.currentUser?.uid
            }
          />
        )}
      />

      <MessageInput
        onSend={handleSend}
      />
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

    header: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      backgroundColor:
        COLORS.white,
      elevation: 3,
    },

    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      marginHorizontal: 12,
    },

    name: {
      fontSize: 17,
      fontWeight: "700",
      color: COLORS.text,
    },

    status: {
      marginTop: 2,
      color: COLORS.subtitle,
      fontSize: 13,
    },

    messages: {
      padding: 18,
      paddingBottom: 10,
    },
  });