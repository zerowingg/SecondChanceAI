import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
} from "react-native";

import { useEffect, useState } from "react";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

import Input from "../components/Input";

import { COLORS } from "../theme/colors";

export default function EditProfileScreen({
  navigation,
}: any) {
  const [fullName, setFullName] =
    useState("");

  const [age, setAge] =
    useState("");

  const [gender, setGender] =
    useState("");

  const [
    interestedIn,
    setInterestedIn,
  ] = useState("");

  const [city, setCity] =
    useState("");

  const [
    occupation,
    setOccupation,
  ] = useState("");

  const [bio, setBio] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const uid =
        auth.currentUser?.uid;

      if (!uid) return;

      const snapshot =
        await getDoc(
          doc(db, "users", uid)
        );

      if (!snapshot.exists())
        return;

      const data =
        snapshot.data();

      setFullName(
        data.fullName || ""
      );

      setAge(data.age || "");

      setGender(
        data.gender || ""
      );

      setInterestedIn(
        data.interestedIn || ""
      );

      setCity(
        data.city || ""
      );

      setOccupation(
        data.occupation || ""
      );

      setBio(data.bio || "");
    } catch (error) {
      console.log(error);
    }
  }

  async function saveProfile() {
    if (
      !fullName ||
      !age ||
      !gender ||
      !interestedIn
    ) {
      Alert.alert(
        "Incomplete",
        "Please complete all required fields."
      );

      return;
    }

    try {
      const uid =
        auth.currentUser?.uid;

      if (!uid) return;

      await updateDoc(
        doc(db, "users", uid),
        {
          fullName,
          age,
          gender,
          interestedIn,
          city,
          occupation,
          bio,
        }
      );

      Alert.alert(
        "Success",
        "Profile updated successfully."
      );

      navigation.goBack();
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Error",
        "Unable to update profile."
      );
    }
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={
          styles.content
        }
        showsVerticalScrollIndicator={
          false
        }
      >
        <Text
          style={styles.title}
        >
          Edit Profile
        </Text>

        <Text
          style={styles.subtitle}
        >
          Keep your profile
          up-to-date.
        </Text>

        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={
            setFullName
          }
        />

        <Input
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
                {/* Gender */}

        <Text style={styles.sectionTitle}>
          Gender
        </Text>

        <View style={styles.optionContainer}>
          {["Male", "Female", "Other"].map(
            (item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.optionCard,
                  gender === item &&
                    styles.optionSelected,
                ]}
                onPress={() =>
                  setGender(item)
                }
              >
                <Text
                  style={[
                    styles.optionText,
                    gender === item &&
                      styles.optionTextSelected,
                  ]}
                >
                  {item === "Male"
                    ? "👨 Male"
                    : item === "Female"
                    ? "👩 Female"
                    : "🌈 Other"}
                </Text>
              </TouchableOpacity>
            )
          )}
        </View>

        {/* Interested In */}

        <Text style={styles.sectionTitle}>
          Interested In
        </Text>

        <View style={styles.optionContainer}>
          {[
            "Men",
            "Women",
            "Everyone",
          ].map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.optionCard,
                interestedIn === item &&
                  styles.optionSelected,
              ]}
              onPress={() =>
                setInterestedIn(item)
              }
            >
              <Text
                style={[
                  styles.optionText,
                  interestedIn === item &&
                    styles.optionTextSelected,
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Input
          placeholder="City"
          value={city}
          onChangeText={setCity}
        />

        <Input
          placeholder="Occupation"
          value={occupation}
          onChangeText={
            setOccupation
          }
        />

        <Input
          placeholder="Tell us about yourself..."
          value={bio}
          onChangeText={setBio}
          multiline
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProfile}
        >
          <Text
            style={styles.saveButtonText}
          >
            Save Changes
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
    padding: 20,
    paddingBottom: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 25,
    fontSize: 16,
    color: COLORS.subtitle,
  },

  sectionTitle: {
    marginTop: 18,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  optionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },

  optionCard: {
    flex: 1,

    backgroundColor: COLORS.white,

    borderRadius: 18,

    borderWidth: 2,
    borderColor: COLORS.goldBorder,

    paddingVertical: 16,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  optionSelected: {
    backgroundColor: "#FFF8EC",
    borderColor: COLORS.primary,
  },

  optionText: {
    color: COLORS.text,
    fontWeight: "600",
    textAlign: "center",
  },

  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: "700",
  },

  saveButton: {
    marginTop: 30,

    backgroundColor: COLORS.primary,

    borderRadius: 30,

    paddingVertical: 18,

    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 6,
  },

  saveButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});