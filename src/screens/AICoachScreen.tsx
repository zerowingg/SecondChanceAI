import { GLOBAL } from "../theme/styles";
import { getCoachResult } from "../services/coachStore";
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

export default function AICoachScreen() {
  const { compatibility, blueprint } =
    getCoachResult();

  if (!compatibility || !blueprint) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />

        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 30,
          }}
        >
          <Ionicons
            name="sparkles"
            size={70}
            color={COLORS.primary}
          />

          <Text
            style={{
              fontSize: 22,
              fontWeight: "700",
              marginTop: 20,
            }}
          >
            No AI Analysis Yet
          </Text>

          <Text
            style={{
              marginTop: 12,
              textAlign: "center",
              color: COLORS.subtitle,
              lineHeight: 24,
            }}
          >
            Analyze a profile from Discover
            to generate personalized AI
            coaching.
          </Text>
        </View>
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
        <Text style={styles.heading}>
          AI Relationship Coach
        </Text>

        <Text style={styles.subHeading}>
          Personalized insights powered by AI.
        </Text>

        {/* SCORE */}

        <View style={styles.scoreCard}>
          <Text style={styles.scoreTitle}>
            Relationship Score
          </Text>

          <Text style={styles.score}>
            {compatibility.score}%
          </Text>

          <Text style={styles.scoreText}>
            {compatibility.summary}
          </Text>
        </View>

        {/* COMPATIBILITY */}

        <Card
          icon="heart"
          title="Compatibility Analysis"
          text={compatibility.summary}
        />

        {/* GREEN FLAGS */}

        <Card
          icon="checkmark-circle"
          title="✅ Green Flags"
          text={compatibility.greenFlags}
        />

        {/* GROWTH AREAS */}

        <Card
          icon="warning"
          title="🌱 Growth Areas"
          text={blueprint.growthAreas}
        />

        {/* RELATIONSHIP DNA */}

        <Card
          icon="chatbubble"
          title="🧬 Relationship DNA"
          text={`💬 Communication Style
${blueprint.communicationStyle}

❤️ Love Language
${blueprint.loveLanguage}

🧠 Emotional Intelligence
${blueprint.emotionalIntelligence}

🤝 Conflict Resolution
${blueprint.conflictResolution}`}
        />

        {/* AI INSIGHTS */}

        <Card
          icon="sparkles"
          title="Personalized AI Insights"
          text={[
            compatibility.iceBreaker,
            `Attachment Style: ${blueprint.attachmentStyle}`,
            `Relationship Readiness: ${blueprint.relationshipReadiness}`,
          ]}
        />

        <View style={styles.footer}>
          <Ionicons
            name="hardware-chip"
            size={20}
            color={COLORS.primary}
          />

          <Text style={styles.footerText}>
            Powered by AMD AI
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Card({
  icon,
  title,
  text,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  text: string | string[];
}) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Ionicons
          name={icon}
          size={24}
          color={COLORS.primary}
        />

        <Text style={styles.cardTitle}>
          {title}
        </Text>
      </View>

      {Array.isArray(text) ? (
        text.map((item, index) => (
          <Text
            key={index}
            style={styles.cardBody}
          >
            • {item}
          </Text>
        ))
      ) : (
        <Text style={styles.cardBody}>
          {text}
        </Text>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 50,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },

  subHeading: {
    marginTop: 6,
    marginBottom: 25,
    fontSize: 16,
    color: COLORS.subtitle,
  },

  scoreCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 25,
    alignItems: "center",

    marginBottom: 24,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 6,
  },

  scoreTitle: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },

  score: {
    fontSize: 62,
    fontWeight: "800",
    color: "#FFF",
    marginVertical: 10,
  },

  scoreText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },

  card: {
    backgroundColor: COLORS.white,

    borderRadius: 22,

    padding: 20,

    marginBottom: 18,

    borderWidth: 1,
    borderColor: "#EFE8D9",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 4,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  cardTitle: {
    marginLeft: 12,
    fontSize: 19,
    fontWeight: "700",
    color: COLORS.text,
  },

  cardBody: {
    color: COLORS.subtitle,
    fontSize: 15,
    lineHeight: 25,
    marginBottom: 7,
  },

  footer: {
    marginTop: 30,
    marginBottom: 15,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  footerText: {
    marginLeft: 10,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 16,
  },
});