import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../theme/colors";

type Props = {
  visible: boolean;

  title: string;

  messages: string[];

  icon?:
    | "sparkles"
    | "shield-checkmark"
    | "heart"
    | "checkmark-circle";

  iconColor?: string;
};

export default function LoadingOverlay({
  visible,
  title,
  messages,
  icon = "sparkles",
  iconColor = COLORS.primary,
}: Props) {
  const scale = useRef(
    new Animated.Value(1)
  ).current;

  const fade = useRef(
    new Animated.Value(0)
  ).current;

  const progress = useRef(
    new Animated.Value(0)
  ).current;

  const [messageIndex, setMessageIndex] =
    useState(0);

  useEffect(() => {
    if (!visible) {
      fade.setValue(0);
      scale.setValue(1);
      progress.setValue(0);
      setMessageIndex(0);
      return;
    }

    Animated.timing(fade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.12,
          duration: 700,
          easing: Easing.inOut(
            Easing.ease
          ),
          useNativeDriver: true,
        }),

        Animated.timing(scale, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(
            Easing.ease
          ),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 100,
          duration: 1800,
          easing: Easing.linear,
          useNativeDriver: false,
        }),

        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }),
      ])
    ).start();

    const interval = setInterval(() => {
      setMessageIndex(
        (prev) =>
          (prev + 1) %
          messages.length
      );
    }, 1000);

    return () => {
      clearInterval(interval);

      progress.stopAnimation();
      scale.stopAnimation();

      fade.setValue(0);
      scale.setValue(1);
      progress.setValue(0);

      setMessageIndex(0);
    };
  }, [visible]);

  const progressWidth =
    progress.interpolate({
      inputRange: [0, 100],
      outputRange: [
        "5%",
        "100%",
      ],
    });

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <Animated.View
        style={[
          styles.overlay,
          {
            opacity: fade,
          },
        ]}
      >
        <Animated.View
          style={[
            styles.logoCircle,
            {
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={42}
            color={iconColor}
          />
        </Animated.View>

        <Text style={styles.brand}>
          SecondChance AI
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>

        <Text style={styles.subtitle}>
          {
            messages[
              messageIndex
            ]
          }
        </Text>

        <View
          style={
            styles.progressBackground
          }
        >
          <Animated.View
            style={[
              styles.progressFill,
              {
                width:
                  progressWidth,
              },
            ]}
          />
        </View>

        <Text
          style={styles.tagline}
        >
          Because Everyone
          Deserves{"\n"}
          A Second Chance.
        </Text>
      </Animated.View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#FFF8EC",

    borderWidth: 3,
    borderColor: COLORS.primary,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 6,
    },

    elevation: 8,
  },

  brand: {
    marginTop: 28,

    fontSize: 30,

    fontWeight: "800",

    color: COLORS.primary,

    textAlign: "center",
  },

  title: {
    marginTop: 20,

    fontSize: 22,

    fontWeight: "700",

    color: COLORS.text,

    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,

    minHeight: 48,

    fontSize: 16,

    color: COLORS.subtitle,

    textAlign: "center",

    lineHeight: 24,
  },

  progressBackground: {
    width: "100%",

    height: 10,

    marginTop: 38,

    backgroundColor: "#ECECEC",

    borderRadius: 30,

    overflow: "hidden",
  },

  progressFill: {
    height: "100%",

    backgroundColor: COLORS.primary,

    borderRadius: 30,
  },

  tagline: {
    marginTop: 42,

    textAlign: "center",

    color: COLORS.subtitle,

    fontSize: 15,

    fontWeight: "600",

    lineHeight: 24,
  },
});