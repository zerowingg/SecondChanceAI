import React, {
  useEffect,
  useState,
} from "react";

import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { COLORS } from "../../theme/colors";

const STEPS = [
  "Personality Analysis",
  "Interest Matching",
  "Relationship Goals",
  "Lifestyle Comparison",
  "Communication Style",
  "Building Relationship DNA™",
];

export default function LoadingAnalysis() {
  const [progress, setProgress] =
    useState(0);

  useEffect(() => {
    const timer =
      setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }

          return prev + 2;
        });
      }, 80);

    return () =>
      clearInterval(timer);
  }, []);

  return (
    <View style={styles.card}>
      <Text style={styles.logo}>
        🧬
      </Text>

      <Text style={styles.title}>
        AI Relationship Scan
      </Text>

      <Text style={styles.subtitle}>
        Building your Relationship DNA™
      </Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${progress}%`,
            },
          ]}
        />
      </View>

      <Text style={styles.percent}>
        {progress}%
      </Text>

      <View style={styles.steps}>
        {STEPS.map(
          (step, index) => {
            const completed =
              progress >=
              ((index + 1) /
                STEPS.length) *
                100;

            return (
              <View
                key={step}
                style={
                  styles.stepRow
                }
              >
                <Text
                  style={
                    styles.icon
                  }
                >
                  {completed
                    ? "✅"
                    : "⏳"}
                </Text>

                <Text
                  style={[
                    styles.stepText,
                    completed &&
                      styles.doneText,
                  ]}
                >
                  {step}
                </Text>
              </View>
            );
          }
        )}
      </View>
    </View>
  );
}

const styles =
  StyleSheet.create({
    card: {
      backgroundColor:
        COLORS.white,

      borderRadius: 28,

      padding: 28,

      marginVertical: 20,

      elevation: 6,
    },

    logo: {
      fontSize: 48,

      textAlign: "center",
    },

    title: {
      marginTop: 12,

      textAlign: "center",

      fontSize: 24,

      fontWeight: "700",

      color: COLORS.text,
    },

    subtitle: {
      textAlign: "center",

      marginTop: 8,

      color: COLORS.subtitle,

      marginBottom: 25,
    },

    progressBackground: {
      height: 10,

      backgroundColor:
        "#ECECEC",

      borderRadius: 100,

      overflow: "hidden",
    },

    progressFill: {
      height: "100%",

      backgroundColor:
        COLORS.primary,

      borderRadius: 100,
    },

    percent: {
      marginTop: 12,

      textAlign: "center",

      fontWeight: "700",

      fontSize: 18,

      color: COLORS.primary,
    },

    steps: {
      marginTop: 30,
    },

    stepRow: {
      flexDirection: "row",

      alignItems: "center",

      marginBottom: 16,
    },

    icon: {
      fontSize: 18,

      width: 28,
    },

    stepText: {
      fontSize: 16,

      color: COLORS.subtitle,
    },

    doneText: {
      color: COLORS.text,

      fontWeight: "700",
    },
  });