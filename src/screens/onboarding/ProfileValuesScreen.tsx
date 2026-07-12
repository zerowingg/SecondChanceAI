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
import { VALUES } from "../../data/values";
import { COLORS } from "../../theme/colors";

import { auth, db } from "../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";

const MAX_VALUES = 5;

export default function ProfileValuesScreen({
  navigation,
}: any) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [customValue, setCustomValue] = useState("");

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(
        selectedValues.filter((v) => v !== value)
      );
      return;
    }

    if (selectedValues.length >= MAX_VALUES) {
      Alert.alert(
        "Maximum Reached",
        `Select up to ${MAX_VALUES} values.`
      );
      return;
    }

    setSelectedValues([...selectedValues, value]);
  };

  const addCustomValue = () => {
    const value = customValue.trim();

    if (!value) return;

    if (!selectedValues.includes(value)) {
      if (selectedValues.length >= MAX_VALUES) {
        Alert.alert(
          "Maximum Reached",
          `Select up to ${MAX_VALUES} values.`
        );
        return;
      }

      setSelectedValues([
        ...selectedValues,
        value,
      ]);
    }

    setCustomValue("");
  };

  const handleContinue = async () => {
    if (selectedValues.length < 3) {
      Alert.alert(
        "Choose Values",
        "Please select at least 3 values."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) return;

      await updateDoc(
        doc(db, "users", uid),
        {
          values: selectedValues,
        }
      );

      navigation.replace("ProfileAIQuestions");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save values."
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
          backScreen="ProfileLifestyle"
          step={5}
          totalSteps={7}
          title="Your Core Values"
          subtitle="Choose what matters most in your life."
        />

        <View style={styles.chips}>
          {VALUES.map((value) => {
            const selected =
              selectedValues.includes(value);

            return (
              <TouchableOpacity
                key={value}
                style={[
                  styles.chip,
                  selected &&
                    styles.selectedChip,
                ]}
                onPress={() =>
                  toggleValue(value)
                }
              >
                <Text
                  style={[
                    styles.chipText,
                    selected &&
                      styles.selectedText,
                  ]}
                >
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <Text style={styles.label}>
          Add Your Own Value
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: Patience"
          value={customValue}
          onChangeText={setCustomValue}
        />

        <TouchableOpacity
          style={styles.smallButton}
          onPress={addCustomValue}
        >
          <Text style={styles.smallButtonText}>
            Add Value
          </Text>
        </TouchableOpacity>

        <Text style={styles.counter}>
          {selectedValues.length}/{MAX_VALUES} selected
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

  chips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  chip: {
    backgroundColor: COLORS.white,
    borderRadius: 30,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#DDD",
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

  selectedText: {
    color: COLORS.primary,
  },

  label: {
    marginTop: 25,
    marginBottom: 10,
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  input: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  smallButton: {
    marginTop: 15,
    alignSelf: "flex-start",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
  },

  smallButtonText: {
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
    fontWeight: "700",
    fontSize: 18,
  },
});