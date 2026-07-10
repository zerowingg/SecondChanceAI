import React from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";

import { CompatibilityResult } from "../../ai/models/compatibility";
import { RelationshipBlueprint } from "../../ai/models/blueprint";

interface Props {
  compatibility: CompatibilityResult;

  blueprint: RelationshipBlueprint;
}

export default function RelationshipDNACard({
  compatibility,
  blueprint,
}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        🧬 AI Relationship DNA™
      </Text>

      <Text style={styles.subtitle}>
        Personalized AI relationship intelligence
      </Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.score}>
          {compatibility.score}%
        </Text>

        <Text style={styles.scoreLabel}>
          DNA Match Score
        </Text>
      </View>

      <Divider />

      <DNAItem
        icon="❤️"
        title="Compatibility"
        value={compatibility.summary}
      />

      <DNAItem
        icon="💬"
        title="Communication"
        value={
          blueprint.communicationStyle
        }
      />

      <DNAItem
        icon="🤝"
        title="Attachment"
        value={
          blueprint.attachmentStyle
        }
      />

      <DNAItem
        icon="💖"
        title="Love Language"
        value={
          blueprint.loveLanguage
        }
      />

      <DNAItem
        icon="🧠"
        title="Emotional Intelligence"
        value={
          blueprint.emotionalIntelligence
        }
      />

      <DNAItem
        icon="⚖️"
        title="Conflict Style"
        value={
          blueprint.conflictResolution
        }
      />

      <DNAItem
        icon="🌱"
        title="Relationship Readiness"
        value={
          blueprint.relationshipReadiness
        }
      />

      <Divider />

      <Text style={styles.sectionTitle}>
        💚 Green Flags
      </Text>

      {compatibility.greenFlags.map(
        (flag, index) => (
          <Text
            key={index}
            style={styles.list}
          >
            ✅ {flag}
          </Text>
        )
      )}

      <Text style={styles.sectionTitle}>
        📈 Growth Areas
      </Text>

      {compatibility.redFlags.map(
        (flag, index) => (
          <Text
            key={index}
            style={styles.list}
          >
            • {flag}
          </Text>
        )
      )}

      <View style={styles.summaryBox}>
        <Text style={styles.summaryTitle}>
          ✨ AI Recommendation
        </Text>

        <Text style={styles.summary}>
          {blueprint.summary}
        </Text>
      </View>
    </View>
  );
}

function DNAItem({
  icon,
  title,
  value,
}: {
  icon: string;
  title: string;
  value: string;
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.left}>
        {icon} {title}
      </Text>

      <Text style={styles.right}>
        {value}
      </Text>
    </View>
  );
}

function Divider() {
  return (
    <View style={styles.divider} />
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,

    borderRadius: 30,

    padding: 25,

    marginVertical: 20,

    elevation: 6,
  },

  title: {
    fontSize: 25,

    fontWeight: "700",

    color: COLORS.text,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 8,

    textAlign: "center",

    color: COLORS.subtitle,

    marginBottom: 24,
  },

  scoreContainer: {
    alignItems: "center",
  },

  score: {
    fontSize: 58,

    fontWeight: "800",

    color: COLORS.primary,
  },

  scoreLabel: {
    marginTop: 6,

    fontWeight: "600",

    color: COLORS.subtitle,
  },

  divider: {
    height: 1,

    backgroundColor: "#ECECEC",

    marginVertical: 22,
  },

  row: {
    flexDirection: "row",

    justifyContent:
      "space-between",

    marginVertical: 8,
  },

  left: {
    flex: 1,

    color: COLORS.text,

    fontWeight: "600",
  },

  right: {
    flex: 1,

    textAlign: "right",

    color: COLORS.subtitle,
  },

  sectionTitle: {
    marginTop: 18,

    marginBottom: 10,

    fontSize: 18,

    fontWeight: "700",

    color: COLORS.text,
  },

  list: {
    marginBottom: 8,

    color: COLORS.subtitle,

    lineHeight: 23,
  },

  summaryBox: {
    marginTop: 24,

    backgroundColor: "#FFF7EA",

    borderRadius: 18,

    padding: 18,
  },

  summaryTitle: {
    fontSize: 17,

    fontWeight: "700",

    marginBottom: 10,

    color: COLORS.text,
  },

  summary: {
    color: COLORS.subtitle,

    lineHeight: 24,
  },
});