import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ProgressHeader from "../../components/ProgressHeader";
import { RELATIONSHIP_GOALS } from "../../data/goals";
import { updateRelationshipGoal } from "../../services/user.service";
import { COLORS } from "../../theme/colors";

export default function ProfileGoalsScreen({
  navigation,
}: any) {
  const [selectedGoal, setSelectedGoal] = useState("");
  const [customGoal, setCustomGoal] = useState("");

  const handleContinue = async () => {
    const goal =
      selectedGoal === "Other"
        ? customGoal.trim()
        : selectedGoal;

    if (!goal) {
      Alert.alert(
        "Relationship Goal",
        "Please select or write your relationship goal."
      );
      return;
    }

    try {
      await updateRelationshipGoal(goal);

      navigation.replace("ProfileLifestyle");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save relationship goal."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProgressHeader
          backScreen="ProfileInterests"
          step={3}
          totalSteps={7}
          title="Relationship Goals"
          subtitle="Tell us what you're looking for."
        />

        <View style={styles.cardContainer}>
          {RELATIONSHIP_GOALS.map((goal) => {
            const selected =
              selectedGoal === goal;

            return (
              <TouchableOpacity
                key={goal}
                style={[
                  styles.card,
                  selected &&
                    styles.selectedCard,
                ]}
                onPress={() =>
                  setSelectedGoal(goal)
                }
              >
                <Text
                  style={[
                    styles.cardText,
                    selected &&
                      styles.selectedText,
                  ]}
                >
                  {goal}
                </Text>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.card,
              selectedGoal === "Other" &&
                styles.selectedCard,
            ]}
            onPress={() =>
              setSelectedGoal("Other")
            }
          >
            <Text
              style={[
                styles.cardText,
                selectedGoal === "Other" &&
                  styles.selectedText,
              ]}
            >
              Other
            </Text>
          </TouchableOpacity>
        </View>

        {selectedGoal === "Other" && (
          <>
            <Text style={styles.label}>
              Your Goal
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Write your goal..."
              value={customGoal}
              onChangeText={setCustomGoal}
            />
          </>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            Continue
          </Text>
        </TouchableOpacity>
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
    padding: 24,
    paddingBottom: 60,
  },

  cardContainer: {
    gap: 14,
    marginTop: 10,
  },

  card: {
    backgroundColor: COLORS.white,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  selectedCard: {
    backgroundColor: "#FFF8EC",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  cardText: {
    fontSize: 17,
    color: COLORS.text,
    fontWeight: "600",
  },

  selectedText: {
    color: COLORS.primary,
  },

  label: {
    marginTop: 30,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  button: {
    marginTop: 40,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});