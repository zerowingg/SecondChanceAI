import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { doc, updateDoc } from "firebase/firestore";

import { auth, db } from "../../firebase/config";
import { COLORS } from "../../theme/colors";

const options = [
  "Divorced",
  "Single Parent",
  "Widowed",
  "Never Married",
];

export default function UserTypeScreen({ navigation }: any) {
  const [selected, setSelected] = useState("");

  const handleContinue = async () => {
    if (!selected) {
      Alert.alert(
        "Select One",
        "Please choose your relationship status."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        Alert.alert(
          "Error",
          "No authenticated user found."
        );
        return;
      }

      await updateDoc(doc(db, "users", uid), {
        userType: selected,
      });

      navigation.replace("ProfileBasic");
    } catch (error) {
      console.log("USER TYPE ERROR:", error);

      Alert.alert(
        "Error",
        "Unable to save your selection."
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.title}>
        Tell us about yourself
      </Text>

      <Text style={styles.subtitle}>
        This helps our AI personalize your experience and recommend better matches.
      </Text>

      <View style={styles.list}>
        {options.map((item) => (
          <TouchableOpacity
            key={item}
            style={[
              styles.card,
              selected === item && styles.selectedCard,
            ]}
            onPress={() => setSelected(item)}
          >
            <Text
              style={[
                styles.cardText,
                selected === item && styles.selectedCardText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleContinue}
      >
        <Text style={styles.buttonText}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 24,
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },

  subtitle: {
    marginTop: 15,
    marginBottom: 35,
    fontSize: 16,
    color: COLORS.subtitle,
    textAlign: "center",
    lineHeight: 24,
  },

  list: {
    gap: 15,
  },

  card: {
    backgroundColor: COLORS.white,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  selectedCard: {
    backgroundColor: "#FFF8EC",
    borderColor: COLORS.primary,
    borderWidth: 2,
  },

  cardText: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text,
  },

  selectedCardText: {
    color: COLORS.primary,
  },

  button: {
    marginTop: 35,
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});