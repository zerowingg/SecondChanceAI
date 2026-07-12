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
import { INTERESTS } from "../../data/interests";
import { updateUserInterests } from "../../services/user.service";
import { COLORS } from "../../theme/colors";

const MAX_SELECTION = 10;

export default function ProfileInterestsScreen({
  navigation,
}: any) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [customInterest, setCustomInterest] = useState("");

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter(
          (item) => item !== interest
        )
      );
      return;
    }

    if (selectedInterests.length >= MAX_SELECTION) {
      Alert.alert(
        "Maximum Reached",
        `You can select up to ${MAX_SELECTION} interests.`
      );
      return;
    }

    setSelectedInterests([
      ...selectedInterests,
      interest,
    ]);
  };

  const addCustomInterest = () => {
    const value = customInterest.trim();

    if (!value) return;

    if (selectedInterests.includes(value)) {
      setCustomInterest("");
      return;
    }

    if (selectedInterests.length >= MAX_SELECTION) {
      Alert.alert(
        "Maximum Reached",
        `You can select up to ${MAX_SELECTION} interests.`
      );
      return;
    }

    setSelectedInterests([
      ...selectedInterests,
      value,
    ]);

    setCustomInterest("");
  };

  const handleContinue = async () => {
    if (selectedInterests.length < 3) {
      Alert.alert(
        "Select More",
        "Choose at least 3 interests."
      );
      return;
    }

    try {
      await updateUserInterests(selectedInterests);

      navigation.replace("ProfileGoals");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save interests."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProgressHeader
          backScreen="ProfileBasic"
          step={2}
          totalSteps={7}
          title="Your Interests"
          subtitle="Choose what genuinely describes you."
        />

        <View style={styles.chipsContainer}>
          {INTERESTS.map((interest) => {
            const selected =
              selectedInterests.includes(interest);

            return (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.chip,
                  selected && styles.selectedChip,
                ]}
                onPress={() =>
                  toggleInterest(interest)
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    selected &&
                      styles.selectedChipText,
                  ]}
                >
                  {interest}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>
          Add Your Own Interest
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: Astronomy"
          value={customInterest}
          onChangeText={setCustomInterest}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addCustomInterest}
        >
          <Text style={styles.addButtonText}>
            Add Interest
          </Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {selectedInterests.length}/{MAX_SELECTION} selected
        </Text>

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

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 10,
  },

  chip: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 30,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: "#DDDDDD",
  },

  selectedChip: {
    backgroundColor: "#FFF8EC",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  chipText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  selectedChipText: {
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

  addButton: {
    marginTop: 15,
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: 25,
  },

  addButtonText: {
    color: COLORS.white,
    fontWeight: "700",
  },

  counter: {
    marginTop: 20,
    color: COLORS.subtitle,
    fontWeight: "600",
  },

  button: {
    marginTop: 35,
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