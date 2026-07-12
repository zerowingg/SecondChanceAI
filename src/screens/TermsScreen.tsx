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

export default function TermsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.header}>
          <Ionicons
            name="document-text"
            size={60}
            color={COLORS.primary}
          />

          <Text style={styles.title}>
            Terms & Conditions
          </Text>

          <Text style={styles.subtitle}>
            Please read these terms before
            using SecondChance AI.
          </Text>
        </View>

        {/* Respect */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="people"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Respect Others
            </Text>
          </View>

          <Text style={styles.body}>
            Treat every member with respect.
            Harassment, hate speech,
            discrimination or abusive
            behaviour is not permitted.
          </Text>
        </View>

        {/* Authentic Profiles */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="person"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Authentic Profiles
            </Text>
          </View>

          <Text style={styles.body}>
            Create only genuine profiles.
            Fake identities or misleading
            information may result in account
            suspension.
          </Text>
        </View>

        {/* AI */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="sparkles"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              AI Guidance
            </Text>
          </View>

          <Text style={styles.body}>
            AI insights are designed to help
            users make informed decisions,
            but they should not replace your
            personal judgement.
          </Text>
        </View>

        {/* Safety */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="shield-checkmark"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Safety
            </Text>
          </View>

          <Text style={styles.body}>
            Report suspicious activity or
            inappropriate behaviour using
            our in-app safety tools.
          </Text>
        </View>
                {/* User Responsibility */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              User Responsibility
            </Text>
          </View>

          <Text style={styles.body}>
            By using SecondChance AI, you
            agree to follow these Terms &
            Conditions and use the platform
            responsibly and legally.
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
            Thank you for being part of
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