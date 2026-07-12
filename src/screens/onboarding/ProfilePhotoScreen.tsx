import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

import * as ImagePicker from "expo-image-picker";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import {
  auth,
  db,
} from "../../firebase/config";

import ProgressHeader from "../../components/ProgressHeader";
import { COLORS } from "../../theme/colors";
import LoadingOverlay from "../../components/LoadingOverlay";

export default function ProfilePhotoScreen({
  navigation,
}: any) {
  const [image, setImage] = useState("");
const [loading, setLoading] =
  useState(false);
  async function pickImage() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permission Required",
        "Please allow gallery access."
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  }

  async function handleContinue() {
    setLoading(true);
    try {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        Alert.alert("Error", "User not found.");
        return;
      }

      await updateDoc(doc(db, "users", uid), {
        profileCompleted: true,

        photoURL:
          image ||
          "https://ui-avatars.com/api/?name=SecondChance&background=C8A96A&color=ffffff",
      });

      setTimeout(() => {
  setLoading(false);

  navigation.reset({
    index: 0,
    routes: [
      {
        name: "Main",
      },
    ],
  });
}, 2200);

    } catch (error) {
      console.log("PHOTO ERROR:", error);

      Alert.alert(
        "Error",
        "Unable to save your profile."
      );
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <ProgressHeader
          backScreen="ProfileAIQuestions"
          step={7}
          totalSteps={7}
          title="Add Profile Photo"
          subtitle="Profiles with photos receive more matches."
        />

        <TouchableOpacity
          style={styles.photoContainer}
          onPress={pickImage}
        >
          {image ? (
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          ) : (
            <Text style={styles.placeholder}>
              📷{"\n\n"}
              Tap to select photo
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            Finish Profile
          </Text>
        </TouchableOpacity>

        <LoadingOverlay
  visible={loading}
  icon="heart"
  title="Welcome to SecondChance AI"
  messages={[
    "Building your personalized AI experience...",
    "Preparing your Discover feed...",
    "You're all set!",
    "Because Everyone Deserves A Second Chance.",
  ]}
/>
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

  photoContainer: {
    marginTop: 35,
    width: 250,
    height: 250,
    borderRadius: 125,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 2,
    borderColor: "#DDD",
    overflow: "hidden",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  placeholder: {
    textAlign: "center",
    color: COLORS.subtitle,
    fontSize: 18,
    lineHeight: 28,
  },

  button: {
    marginTop: 50,
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