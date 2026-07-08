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
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import {
  doc,
  updateDoc,
} from "firebase/firestore";

import { auth, db, storage } from "../../firebase/config";

import ProgressHeader from "../../components/ProgressHeader";
import { COLORS } from "../../theme/colors";

export default function ProfilePhotoScreen({
  navigation,
}: any) {
  const [image, setImage] = useState("");

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
        mediaTypes:
          ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
        allowsEditing: true,
        aspect: [1, 1],
      });

    if (result.canceled) return;

    setImage(result.assets[0].uri);
  }

  async function handleContinue() {
    if (!image) {
      Alert.alert(
        "Profile Photo",
        "Please select a profile photo."
      );
      return;
    }

    try {
      const uid = auth.currentUser?.uid;

      if (!uid) return;

      const response = await fetch(image);

      const blob = await response.blob();

      const storageRef = ref(
        storage,
        `profilePhotos/${uid}.jpg`
      );

      await uploadBytes(storageRef, blob);

      const downloadURL =
        await getDownloadURL(storageRef);

      await updateDoc(
        doc(db, "users", uid),
        {
          profilePhoto: downloadURL,
          profileCompleted: true,
        }
      );

      navigation.replace("Discover");
    } catch (error) {
      console.log(error);

      Alert.alert(
        "Upload Failed",
        "Unable to upload profile photo."
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
          step={7}
          totalSteps={7}
          title="Add Profile Photo"
          subtitle="Profiles with photos receive significantly more matches."
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
              📷

              {"\n\n"}

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
    alignSelf: "center",
    borderRadius: 125,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
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