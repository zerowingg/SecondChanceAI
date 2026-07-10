import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { UserProfile } from "../types/user";
import { DEMO_PROFILES } from "../data/demoProfiles";

export async function getCurrentUser(): Promise<UserProfile | null> {
  try {
    const uid = auth.currentUser?.uid;

    if (!uid) {
      return null;
    }

    const snapshot = await getDoc(
      doc(db, "users", uid)
    );

    if (!snapshot.exists()) {
      console.log("User document not found.");
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<UserProfile, "id">),
    };
  } catch (error) {
    console.log("getCurrentUser Error:", error);
    return null;
  }
}

export async function getUserById(
  userId: string
): Promise<UserProfile | null> {
  try {
    const snapshot = await getDoc(
      doc(db, "users", userId)
    );

    if (!snapshot.exists()) {
      return null;
    }

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<UserProfile, "id">),
    };
  } catch (error) {
    console.log("getUserById Error:", error);
    return null;
  }
}

export async function getDiscoverProfiles(): Promise<UserProfile[]> {
  try {
    const currentUID = auth.currentUser?.uid;

    if (!currentUID) {
      return [];
    }

    const currentSnapshot = await getDoc(
      doc(db, "users", currentUID)
    );

    if (
      !currentSnapshot.exists() ||
      !currentSnapshot.data().profileCompleted
    ) {
      console.log("Current user profile incomplete.");
      return [];
    }

    const snapshot = await getDocs(
      collection(db, "users")
    );

    const users: UserProfile[] = [];

    snapshot.forEach((docSnap) => {
      const data = docSnap.data();

      if (docSnap.id === currentUID) return;

      if (!data.profileCompleted) return;

      users.push({
        id: docSnap.id,
        ...(data as Omit<UserProfile, "id">),
      });
    });

    if (users.length === 0) {
      console.log("Using demo profiles.");
      return DEMO_PROFILES;
    }

    return users;
  } catch (error) {
    console.log("Discover Error:", error);
    return DEMO_PROFILES;
  }
}

export async function updateCurrentUser(
  data: Partial<UserProfile>
): Promise<void> {
  try {
    const uid = auth.currentUser?.uid;

    if (!uid) return;

    await updateDoc(
      doc(db, "users", uid),
      data
    );
  } catch (error) {
    console.log("Update Error:", error);
  }
}

/* -----------------------------
   ONBOARDING HELPERS
--------------------------------*/

export async function updateUserInterests(
  interests: string[]
): Promise<void> {
  await updateCurrentUser({
    interests,
  });
}

export async function updateRelationshipGoal(
  goal: string
): Promise<void> {
  await updateCurrentUser({
    goals: [goal],
  });
}

export async function updateLifestyle(
  data: {
    personality: string;
    smoking: string;
    drinking: string;
    children: string;
    languages: string[];
  }
): Promise<void> {
  await updateCurrentUser({
    lifestyle: {
      personality: data.personality,
      smoking: data.smoking,
      drinking: data.drinking,
      children: data.children,
    },

    languages: data.languages,
  });
}

export async function updateValues(
  values: string[]
): Promise<void> {
  await updateCurrentUser({
    values,
  });
}

export async function updateAIAnswers(
  aiAnswers: {
    previousRelationship?: string;
    partnerExpectations?: string;
    futureGoals?: string;
  }
): Promise<void> {
  await updateCurrentUser({
    aiAnswers,
  });
}