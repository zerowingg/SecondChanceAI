import { GLOBAL } from "../../theme/styles";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { getProfileImage } from "../../utils/avatar";

import { COLORS } from "../../theme/colors";

import { UserProfile } from "../../types/user";

import MatchBadge from "./MatchBadge";
import AIInsightCard from "./AIInsightCard";
import RelationshipDNA from "./RelationshipDNA";

import { calculateMatchScore } from "../../services/match.service";

interface Props {
  currentUser: UserProfile;
  profile: UserProfile;
}

export default function ProfileCard({
  currentUser,
  profile,
}: Props) {
  const score = calculateMatchScore(
    currentUser,
    profile
  );

  return (
    <View style={styles.card}>
      <Image
  source={getProfileImage(profile)}
  style={styles.image}
/>

      <View style={styles.content}>
        <Text style={styles.name}>
          {profile.fullName}, {profile.age}
        </Text>

        <Text style={styles.job}>
          {profile.occupation} • {profile.city}
        </Text>

        <MatchBadge score={score} />

        <AIInsightCard
          profile={profile}
        />

        <RelationshipDNA
          profile={profile}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
  ...GLOBAL.premiumCard,

  overflow: "hidden",

  marginBottom: 10,
},

  image: {
  width: "100%",
  height: 340,

  borderBottomWidth: 1,

  borderBottomColor: COLORS.premiumBorder,
},

  content: {
    padding: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    color: COLORS.text,
  },

  job: {
    marginTop: 8,
    marginBottom: 20,
    color: COLORS.subtitle,
    fontSize: 15,
  },
});