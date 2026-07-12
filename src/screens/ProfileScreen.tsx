import { GLOBAL } from "../theme/styles";
import { StatusBar } from "expo-status-bar";
import {
  useState,
  useCallback,
} from "react";
import {
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { signOut } from "firebase/auth";

import { auth } from "../firebase/config";

import { COLORS } from "../theme/colors";

import { UserProfile } from "../types/user";

import {
  getCurrentUser,
} from "../services/user.service";

import { getProfileImage } from "../utils/avatar";

export default function ProfileScreen() {
  const navigation = useNavigation<any>();

  const [user, setUser] =
    useState<UserProfile | null>(null);

  const [loading, setLoading] =
    useState(true);

  useFocusEffect(
  useCallback(() => {
    loadProfile();
  }, [])
);

  async function loadProfile() {
    try {
      const profile =
        await getCurrentUser();

      setUser(profile);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function logout() {
  Alert.alert(
    "Logout",
    "Are you sure you want to logout?",
    [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await signOut(auth);

            navigation.reset({
              index: 0,
              routes: [{ name: "Welcome" }],
            });
          } catch (error) {
            Alert.alert(
              "Logout Failed",
              "Please try again."
            );
          }
        },
      },
    ]
  );
}

  function deleteAccount() {
    Alert.alert(
      "Delete Account",
      "This feature will be available soon."
    );
  }

  function editProfile() {
  navigation.navigate("EditProfile");
}

  function openSafety() {
    Alert.alert(
      "Safety Center",
      "Always meet in public places and never share OTPs or financial information."
    );
  }

  function openPrivacy() {
  navigation.navigate("Privacy");
}

  function openTerms() {
  navigation.navigate("Terms");
}

  function openAbout() {
  navigation.navigate("About");
}
function openContactSupport() {
  navigation.navigate("ContactSupport");
}

  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar style="dark" />

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Loading Profile...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView
        style={styles.container}
      >
        <StatusBar style="dark" />

        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            Unable to load profile.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
    >
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={
          styles.content
        }
      >
        <View style={styles.header}>

          <Image
            source={getProfileImage(user)}
            style={styles.avatar}
          />

          <Text style={styles.name}>
            {user.fullName}
          </Text>

          <Text style={styles.subtitle}>
            {user.age} • {user.city}
          </Text>

          <Text style={styles.job}>
            {user.occupation}
          </Text>

          <TouchableOpacity
            style={styles.editButton}
            onPress={editProfile}
          >
            <Ionicons
              name="create-outline"
              size={18}
              color="#FFF"
            />

            <Text
              style={
                styles.editButtonText
              }
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

        </View>

        {/* ===========================
            SECTION CARDS START HERE
        ============================ */}
                {/* ABOUT */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            About Me
          </Text>

          <Text style={styles.body}>
            {user.bio?.trim() ||
              "No bio added yet."}
          </Text>
        </View>

        {/* RELATIONSHIP */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Relationship
          </Text>

          <InfoRow
            icon="person-outline"
            title="Gender"
            value={user.gender}
          />

          <InfoRow
            icon="heart-outline"
            title="Interested In"
            value={
              user.interestedIn ||
              "Not specified"
            }
          />

          <InfoRow
            icon="flag-outline"
            title="Relationship Goal"
            value={
              user.goals?.length
                ? user.goals.join(", ")
                : "Not specified"
            }
          />

          <InfoRow
            icon="language-outline"
            title="Languages"
            value={
              user.languages?.length
                ? user.languages.join(", ")
                : "Not specified"
            }
          />
        </View>

        {/* INTERESTS */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Interests
          </Text>

          <View style={styles.chipContainer}>
            {user.interests?.length ? (
              user.interests.map(
                (item, index) => (
                  <View
                    key={index}
                    style={styles.chip}
                  >
                    <Text
                      style={
                        styles.chipText
                      }
                    >
                      {item}
                    </Text>
                  </View>
                )
              )
            ) : (
              <Text style={styles.body}>
                No interests added.
              </Text>
            )}
          </View>
        </View>

        {/* VALUES */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Values
          </Text>

          <View style={styles.chipContainer}>
            {user.values?.length ? (
              user.values.map(
                (item, index) => (
                  <View
                    key={index}
                    style={styles.chip}
                  >
                    <Text
                      style={
                        styles.chipText
                      }
                    >
                      {item}
                    </Text>
                  </View>
                )
              )
            ) : (
              <Text style={styles.body}>
                No values added.
              </Text>
            )}
          </View>
        </View>

        {/* AI PROFILE */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            AI Profile Summary
          </Text>

          <InfoBlock
            title="Previous Relationship"
            value={
              user.aiAnswers
                ?.previousRelationship
            }
          />

          <InfoBlock
            title="Partner Expectations"
            value={
              user.aiAnswers
                ?.partnerExpectations
            }
          />

          <InfoBlock
            title="Future Goals"
            value={
              user.aiAnswers
                ?.futureGoals
            }
          />
        </View>
                {/* ACCOUNT */}

        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Account
          </Text>

          <MenuItem
            icon="create-outline"
            title="Edit Profile"
            color={COLORS.text}
            onPress={editProfile}
          />

          <MenuItem
            icon="information-circle-outline"
            title="About SecondChance AI"
            color={COLORS.text}
            onPress={openAbout}
          />
          <MenuItem
            icon="headset-outline"
            title="Contact & Support"
            color={COLORS.text}
            onPress={openContactSupport}
/>

          <MenuItem
            icon="shield-checkmark-outline"
            title="Safety Center"
            color={COLORS.text}
            onPress={openSafety}
          />

          <MenuItem
            icon="document-text-outline"
            title="Terms & Conditions"
            color={COLORS.text}
            onPress={openTerms}
          />

          <MenuItem
            icon="lock-closed-outline"
            title="Privacy Policy"
            color={COLORS.text}
            onPress={openPrivacy}
          />

          <MenuItem
            icon="log-out-outline"
            title="Logout"
            color="#E67E22"
            onPress={logout}
          />

          <MenuItem
            icon="trash-outline"
            title="Delete Account"
            color="#E53935"
            onPress={deleteAccount}
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

/* -----------------------------
   COMPONENTS
--------------------------------*/

function InfoRow({
  icon,
  title,
  value,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  value?: string;
}) {
  return (
    <View style={styles.infoRow}>
      <View style={styles.infoLeft}>
        <Ionicons
          name={icon}
          size={20}
          color={COLORS.primary}
        />

        <Text style={styles.infoTitle}>
          {title}
        </Text>
      </View>

      <Text style={styles.infoValue}>
        {value || "Not specified"}
      </Text>
    </View>
  );
}

function InfoBlock({
  title,
  value,
}: {
  title: string;
  value?: string;
}) {
  return (
    <View style={styles.infoBlock}>
      <Text style={styles.infoBlockTitle}>
        {title}
      </Text>

      <Text style={styles.infoBlockValue}>
        {value || "Not provided"}
      </Text>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={22}
          color={color}
        />

        <Text
          style={[
            styles.menuTitle,
            { color },
          ]}
        >
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#BDBDBD"
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    paddingBottom: 40,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  loadingText: {
    fontSize: 18,
    color: COLORS.subtitle,
    fontWeight: "600",
  },

  header: {
    alignItems: "center",
    paddingVertical: 35,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 5,
    marginBottom: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 4,
    borderColor: COLORS.primary,
  },

  name: {
    marginTop: 18,
    fontSize: 30,
    fontWeight: "700",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: COLORS.subtitle,
  },

  job: {
    marginTop: 6,
    fontSize: 16,
    color: COLORS.subtitle,
  },

  editButton: {
    marginTop: 22,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 13,
    borderRadius: 30,
  },

  editButtonText: {
    color: "#FFF",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },

  card: {
    marginHorizontal: 18,
    marginBottom: 18,
    backgroundColor: COLORS.white,
    borderRadius: 22,
    padding: 20,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 16,
  },

  body: {
    fontSize: 15,
    lineHeight: 24,
    color: COLORS.subtitle,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
  },

  infoLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  infoTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "600",
  },

  infoValue: {
    flex: 1,
    textAlign: "right",
    color: COLORS.subtitle,
    fontSize: 14,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: "#FFF7EA",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  chipText: {
    color: COLORS.primary,
    fontWeight: "600",
    fontSize: 14,
  },

  infoBlock: {
    marginBottom: 18,
  },

  infoBlockTitle: {
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
    fontSize: 15,
  },

  infoBlockValue: {
    color: COLORS.subtitle,
    lineHeight: 22,
    fontSize: 14,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuTitle: {
    marginLeft: 14,
    fontSize: 16,
    fontWeight: "600",
  },
});