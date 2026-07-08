import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  View,
} from "react-native";

import { doc, updateDoc } from "firebase/firestore";

import Input from "../components/Input";
import ScreenHeader from "../components/ScreenHeader";
import { COLORS } from "../theme/colors";
import { auth, db } from "../firebase/config";

const genders = [
  "Male",
  "Female",
  "Other",
];

export default function ProfileSetupScreen({ navigation }: any) {
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");
  const [gender, setGender] = useState("");

  const handleSave = async () => {
    if (
      !age ||
      !city ||
      !occupation ||
      !bio ||
      !gender
    ) {
      Alert.alert(
        "Incomplete Profile",
        "Please complete all fields."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        Alert.alert(
          "Error",
          "User not found."
        );
        return;
      }

      await updateDoc(doc(db, "users", uid), {
        age: Number(age),
        city,
        occupation,
        bio,
        gender,
        profileCompleted: true,
      });

      Alert.alert(
        "Profile Saved",
        "Your profile has been completed.",
        [
          {
            text: "Continue",
            onPress: () =>
              navigation.replace("Discover"),
          },
        ]
      );
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to save profile."
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
        <ScreenHeader
          title="Complete Your Profile"
          subtitle="Let's make your profile stand out."
        />

        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            📷
          </Text>
        </View>

        <Text style={styles.avatarLabel}>
          Profile Photo (Coming Next)
        </Text>

        <Input
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />

        <Input
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <Input
          placeholder="Occupation"
          value={occupation}
          onChangeText={setOccupation}
        />

        <Input
          placeholder="Short Bio"
          value={bio}
          onChangeText={setBio}
        />

        <Text style={styles.sectionTitle}>
          Gender
        </Text>

        <View style={styles.genderContainer}>
          {genders.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.genderCard,
                gender === item &&
                  styles.genderCardSelected,
              ]}
              onPress={() => setGender(item)}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === item &&
                    styles.genderTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleSave}
        >
          <Text style={styles.buttonText}>
            Complete Profile
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

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#F4F4F4",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  avatarText: {
    fontSize: 40,
  },

  avatarLabel: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 30,
    color: COLORS.subtitle,
  },

  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  genderCard: {
    flex: 1,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: "center",
    backgroundColor: COLORS.white,
  },

  genderCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: "#FFF8EC",
  },

  genderText: {
    color: COLORS.text,
    fontWeight: "600",
  },

  genderTextSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});