import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

import {
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebase/config";

import Input from "../../components/Input";
import ProgressHeader from "../../components/ProgressHeader";

import { COLORS } from "../../theme/colors";

export default function ProfileBasicScreen({
  navigation,
}: any) {
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [occupation, setOccupation] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const uid = auth.currentUser?.uid;

      if (!uid) return;

      const snapshot = await getDoc(
        doc(db, "users", uid)
      );

      if (snapshot.exists()) {
        const data = snapshot.data();

        setFullName(data.fullName || "");
        setAge(data.age || "");
        setGender(data.gender || "");
        setCity(data.city || "");
        setOccupation(data.occupation || "");
        setBio(data.bio || "");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleContinue = async () => {
    if (
      !fullName ||
      !age ||
      !gender ||
      !city ||
      !occupation ||
      !bio
    ) {
      Alert.alert(
        "Incomplete",
        "Please complete all fields."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) return;

      await updateDoc(
        doc(db, "users", uid),
        {
          fullName,
          age,
          gender,
          city,
          occupation,
          bio,
        }
      );

      navigation.replace(
        "ProfileInterests"
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
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <ProgressHeader
          step={1}
          totalSteps={5}
          title="Complete Your Profile"
          subtitle="Let's begin with some basic information."
        />

        <Input
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <Input
          placeholder="Age"
          value={age}
          onChangeText={setAge}
        />
                <Text style={styles.sectionTitle}>
          Gender
        </Text>

        <View style={styles.genderContainer}>
          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === "Male" &&
                styles.genderSelected,
            ]}
            onPress={() => setGender("Male")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "Male" &&
                  styles.genderTextSelected,
              ]}
            >
              👨 Male
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === "Female" &&
                styles.genderSelected,
            ]}
            onPress={() => setGender("Female")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "Female" &&
                  styles.genderTextSelected,
              ]}
            >
              👩 Female
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderCard,
              gender === "Other" &&
                styles.genderSelected,
            ]}
            onPress={() => setGender("Other")}
          >
            <Text
              style={[
                styles.genderText,
                gender === "Other" &&
                  styles.genderTextSelected,
              ]}
            >
              🌈 Other
            </Text>
          </TouchableOpacity>
        </View>

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
          placeholder="Tell us about yourself..."
          value={bio}
          onChangeText={setBio}
          multiline
        />

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

  sectionTitle: {
    marginTop: 15,
    marginBottom: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  genderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  genderCard: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    alignItems: "center",
    backgroundColor: COLORS.white,
  },
    genderSelected: {
    borderColor: COLORS.primary,
    borderWidth: 2,
    backgroundColor: "#FFF8EC",
  },

  genderText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text,
  },

  genderTextSelected: {
    color: COLORS.primary,
  },

  button: {
    marginTop: 30,
    backgroundColor: COLORS.primary,
    paddingVertical: 18,
    borderRadius: 30,
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

  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: "700",
  },
});