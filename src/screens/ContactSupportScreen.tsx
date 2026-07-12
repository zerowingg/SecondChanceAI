import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../theme/colors";

export default function ContactSupportScreen() {

  async function openURL(url: string) {
    const supported =
      await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    }
  }

  function openSupportEmail() {
    openURL(
      "mailto:secondchanceaiofficial@gmail.com?subject=Support%20Request"
    );
  }

  function reportBug() {
    openURL(
      "mailto:secondchanceaiofficial@gmail.com?subject=[BUG]%20SecondChance%20AI"
    );
  }

  function featureRequest() {
    openURL(
      "mailto:secondchanceaiofficial@gmail.com?subject=[FEATURE]%20SecondChance%20AI"
    );
  }

  function founderEmail() {
    openURL(
      "mailto:ankitanurag383@gmail.com"
    );
  }

  function github() {
    openURL(
      "https://github.com/zerowingg"
    );
  }

  function instagram() {
    openURL(
      "https://instagram.com/secondchanceai"
    );
  }

  function website() {
    // Update tomorrow
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>
          Contact & Support
        </Text>

        <Text style={styles.subtitle}>
          We'd love to hear from you.
          {"\n"}
          Reach out anytime.
        </Text>

        {/* CONTACT SUPPORT */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={openSupportEmail}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="mail"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Contact Support
              </Text>

              <Text style={styles.cardSubtitle}>
                secondchanceaiofficial@gmail.com
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* INSTAGRAM */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={instagram}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="logo-instagram"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Instagram
              </Text>

              <Text style={styles.cardSubtitle}>
                @secondchance_ai
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* GITHUB */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={github}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="logo-github"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                GitHub
              </Text>

              <Text style={styles.cardSubtitle}>
                github.com/AnkitAnurag
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* WEBSITE */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={website}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="globe-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Official Website
              </Text>

              <Text style={styles.cardSubtitle}>
                Coming Soon
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>
                {/* REPORT BUG */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={reportBug}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="bug-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Report a Bug
              </Text>

              <Text style={styles.cardSubtitle}>
                Help us improve SecondChance AI
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* FEATURE REQUEST */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={featureRequest}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="bulb-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Feature Request
              </Text>

              <Text style={styles.cardSubtitle}>
                Share your ideas with us
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* FOUNDER */}

        <TouchableOpacity
          style={styles.card}
          activeOpacity={0.85}
          onPress={founderEmail}
        >
          <View style={styles.left}>
            <View style={styles.iconBox}>
              <Ionicons
                name="person-circle-outline"
                size={24}
                color={COLORS.primary}
              />
            </View>

            <View>
              <Text style={styles.cardTitle}>
                Founder
              </Text>

              <Text style={styles.cardSubtitle}>
                Ankit Anurag
              </Text>

              <Text
                style={[
                  styles.cardSubtitle,
                  {
                    marginTop: 2,
                    fontSize: 13,
                  },
                ]}
              >
                ankitanurag383@gmail.com
              </Text>
            </View>
          </View>

          <Ionicons
            name="chevron-forward"
            size={20}
            color="#BDBDBD"
          />
        </TouchableOpacity>

        {/* VERSION */}

        <View style={styles.versionCard}>
          <Text style={styles.versionTitle}>
            SecondChance AI
          </Text>

          <Text style={styles.versionSubtitle}>
            Because Everyone Deserves A Second Chance.
          </Text>

          <Text style={styles.versionText}>
            Version 1.0.0
          </Text>
        </View>
                {/* FOOTER */}

        <View style={styles.footer}>
          <Ionicons
            name="heart"
            size={18}
            color={COLORS.primary}
          />

          <Text style={styles.footerTitle}>
            Thank you for being part of
            the SecondChance AI journey.
          </Text>

          <Text style={styles.footerSubtitle}>
            Every meaningful connection
            deserves a second chance.
          </Text>

          <Text style={styles.footerDeveloper}>
            Designed & Developed by
          </Text>

          <Text style={styles.footerFounder}>
            Ankit Anurag
          </Text>

          <Text style={styles.footerCopyright}>
            © 2026 SecondChance AI
          </Text>
        </View>

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
    paddingBottom: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "800",
    color: COLORS.text,
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 30,
    fontSize: 16,
    color: COLORS.subtitle,
    lineHeight: 24,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    backgroundColor: COLORS.white,

    borderRadius: 20,

    padding: 18,

    marginBottom: 16,

    borderWidth: 1,
    borderColor: COLORS.goldBorder,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  iconBox: {
    width: 52,
    height: 52,

    borderRadius: 16,

    backgroundColor: "#FFF8EC",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 15,
  },

  cardTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: COLORS.text,
  },

  cardSubtitle: {
    marginTop: 4,
    color: COLORS.subtitle,
    fontSize: 14,
  },

  versionCard: {
    backgroundColor: COLORS.white,

    borderRadius: 22,

    padding: 24,

    marginTop: 12,

    alignItems: "center",

    borderWidth: 1,
    borderColor: COLORS.goldBorder,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },

    elevation: 3,
  },

  versionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.primary,
  },

  versionSubtitle: {
    marginTop: 10,
    textAlign: "center",
    color: COLORS.subtitle,
    lineHeight: 22,
  },

  versionText: {
    marginTop: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  footer: {
    marginTop: 35,
    marginBottom: 20,
    alignItems: "center",
  },

  footerTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    textAlign: "center",
  },

  footerSubtitle: {
    marginTop: 10,
    color: COLORS.subtitle,
    textAlign: "center",
    lineHeight: 24,
  },

  footerDeveloper: {
    marginTop: 28,
    color: COLORS.subtitle,
    fontSize: 14,
  },

  footerFounder: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },

  footerCopyright: {
    marginTop: 20,
    color: COLORS.subtitle,
    fontSize: 13,
  },
});