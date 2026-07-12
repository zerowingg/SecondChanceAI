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
import Logo from "../components/Logo";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Logo */}

        <View style={styles.logoContainer}>
          <Logo />

          <Text style={styles.appName}>
            SecondChance AI
          </Text>

          <Text style={styles.tagline}>
            Because Everyone Deserves
            {"\n"}A Second Chance
          </Text>
        </View>

        {/* Mission */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="rocket"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Our Mission
            </Text>
          </View>

          <Text style={styles.body}>
            SecondChance AI helps people
            build genuine, meaningful
            relationships through AI,
            emotional compatibility and
            trust-first matchmaking.
          </Text>
        </View>

        {/* Founder */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="person-circle"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Founder
            </Text>
          </View>

          <Text style={styles.highlight}>
            Ankit Anurag
          </Text>

          <Text style={styles.body}>
            Creator of SecondChance AI,
            designed and developed for the
            AMD Developer Hackathon ACT II.
          </Text>
        </View>

        {/* Technology */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="hardware-chip"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Technology
            </Text>
          </View>

          <InfoRow
            label="Frontend"
            value="React Native + Expo"
          />

          <InfoRow
            label="Language"
            value="TypeScript"
          />

          <InfoRow
            label="Backend"
            value="Firebase"
          />

          <InfoRow
            label="Authentication"
            value="Firebase Auth"
          />

          <InfoRow
            label="Database"
            value="Cloud Firestore"
          />

          <InfoRow
            label="Artificial Intelligence"
            value="AMD AI"
          />
        </View>
                {/* App Information */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="information-circle"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Application
            </Text>
          </View>

          <InfoRow
            label="Version"
            value="1.0.0"
          />

          <InfoRow
            label="Platform"
            value="Android / iOS"
          />

          <InfoRow
            label="Build"
            value="AMD Hackathon Edition"
          />

          <InfoRow
            label="Powered By"
            value="AMD AI"
          />
        </View>

        {/* Built For */}

        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons
              name="trophy"
              size={24}
              color={COLORS.primary}
            />

            <Text style={styles.cardTitle}>
              Built For
            </Text>
          </View>

          <Text style={styles.body}>
            AMD Developer Hackathon ACT II
          </Text>

          <Text style={styles.body}>
            Built with innovation,
            artificial intelligence,
            and a passion for creating
            meaningful human connections.
          </Text>
        </View>

        {/* Footer */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Made with ❤️ in India
          </Text>

          <Text style={styles.footerText}>
            © 2026 SecondChance AI
          </Text>

          <Text style={styles.footerText}>
            Because Everyone Deserves A Second Chance
          </Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* ------------------------------
   Components
------------------------------ */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>
        {label}
      </Text>

      <Text style={styles.infoValue}>
        {value}
      </Text>
    </View>
  );
}

/* ------------------------------
   Styles
------------------------------ */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  logoContainer: {
    alignItems: "center",
    marginBottom: 28,
  },

  appName: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  tagline: {
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

  highlight: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
    marginBottom: 12,
  },

  body: {
    color: COLORS.subtitle,
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 8,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F2F2F2",
  },

  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  infoValue: {
    fontSize: 16,
    color: COLORS.subtitle,
  },

  footer: {
    marginTop: 20,
    marginBottom: 25,
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
    textAlign: "center",
  },
});