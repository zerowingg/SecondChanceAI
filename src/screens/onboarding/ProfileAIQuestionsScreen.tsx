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

import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

import ProgressHeader from "../../components/ProgressHeader";
import { AI_QUESTIONS } from "../../data/aiQuestions";
import { COLORS } from "../../theme/colors";

export default function ProfileAIQuestionsScreen({
  navigation,
}: any) {
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");

  const handleContinue = async () => {
    if (
      !answer1.trim() ||
      !answer2.trim() ||
      !answer3.trim()
    ) {
      Alert.alert(
        "Incomplete",
        "Please answer all three questions."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        Alert.alert("Error", "User not found.");
        return;
      }

      await updateDoc(doc(db, "users", uid), {
        aiAnswers: {
          previousRelationship: answer1.trim(),
          partnerExpectations: answer2.trim(),
          futureGoals: answer3.trim(),
        },
      });

      navigation.replace("ProfilePhoto");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save your answers."
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
          step={6}
          totalSteps={7}
          title="Help AI Know You"
          subtitle="These answers help us build meaningful compatibility."
        />

        <View style={styles.questionCard}>
          <Text style={styles.question}>
            {AI_QUESTIONS[0].question}
          </Text>

          <TextInput
            style={styles.input}
            multiline
            textAlignVertical="top"
            placeholder="Write your answer..."
            value={answer1}
            onChangeText={setAnswer1}
          />
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.question}>
            {AI_QUESTIONS[1].question}
          </Text>

          <TextInput
            style={styles.input}
            multiline
            textAlignVertical="top"
            placeholder="Write your answer..."
            value={answer2}
            onChangeText={setAnswer2}
          />
        </View>

        <View style={styles.questionCard}>
          <Text style={styles.question}>
            {AI_QUESTIONS[2].question}
          </Text>

          <TextInput
            style={styles.input}
            multiline
            textAlignVertical="top"
            placeholder="Write your answer..."
            value={answer3}
            onChangeText={setAnswer3}
          />
        </View>

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

  questionCard: {
    marginTop: 22,
  },

  question: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
    lineHeight: 26,
  },

  input: {
    minHeight: 130,
    backgroundColor: COLORS.white,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    padding: 18,
    fontSize: 16,
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