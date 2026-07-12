import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../theme/colors";

export default function PrivacyScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Ionicons
            name="shield-checkmark"
            size={60}
            color={COLORS.primary}
          />

          <Text style={styles.title}>
            Privacy Policy
          </Text>

          <Text style={styles.subtitle}>
            Your privacy and security are our
            highest priorities.
          </Text>
        </View>

        {/* Data Security */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="lock-closed"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Data Security
            </Text>
          </View>

          <Text style={styles.body}>
            SecondChance AI securely stores
            your information using Firebase.
            Sensitive data is protected with
            industry-standard security
            practices.
          </Text>
        </View>

        {/* AI Processing */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="sparkles"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              AI Processing
            </Text>
          </View>

          <Text style={styles.body}>
            Our AI analyzes only the profile
            information necessary to generate
            compatibility insights,
            relationship DNA and coaching.
          </Text>
        </View>

        {/* Messages */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="chatbubble-ellipses"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Conversations
            </Text>
          </View>

          <Text style={styles.body}>
            Messages exchanged between users
            remain private and are never sold
            or shared with third parties.
          </Text>
        </View>

        {/* Photos */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="images"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Photos
            </Text>
          </View>

          <Text style={styles.body}>
            Your uploaded profile photos are
            used only to display your profile
            within SecondChance AI.
          </Text>
        </View>
                {/* Your Rights */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="person-circle"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Your Rights
            </Text>
          </View>

          <Text style={styles.body}>
            You can update your profile,
            photos and personal information
            at any time. We believe users
            should always remain in control
            of their own data.
          </Text>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Last Updated
          </Text>

          <Text style={styles.footerText}>
            July 2026
          </Text>

          <Text style={styles.footerText}>
            Version 1.0
          </Text>

          <Text style={styles.footerBottom}>
            Thank you for trusting
            SecondChance AI ❤️
          </Text>
        </View>
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

  header: {
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    marginTop: 16,
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 10,
    textAlign: "center",
    fontSize: 17,
    lineHeight: 28,
    color: COLORS.subtitle,
  },

  card: {
    backgroundColor: COLORS.white,

    borderRadius: 24,

    borderWidth: 2,
    borderColor: COLORS.goldBorder,

    padding: 22,

    marginBottom: 20,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  cardTitle: {
    marginLeft: 12,
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
  },

  body: {
    color: COLORS.subtitle,
    fontSize: 16,
    lineHeight: 27,
  },

  footer: {
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },

  footerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },

  footerText: {
    marginTop: 8,
    fontSize: 15,
    color: COLORS.subtitle,
  },

  footerBottom: {
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
    textAlign: "center",
  },
});