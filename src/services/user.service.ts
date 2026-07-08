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

    if (!uid) return null;

    const snapshot = await getDoc(doc(db, "users", uid));

    if (!snapshot.exists()) return null;

    return {
      id: snapshot.id,
      ...(snapshot.data() as Omit<UserProfile, "id">),
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getDiscoverProfiles(): Promise<UserProfile[]> {
  try {
    const currentUID = auth.currentUser?.uid;

    const snapshot = await getDocs(collection(db, "users"));

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

    // If no real users exist, use demo profiles
    if (users.length === 0) {
      return DEMO_PROFILES;
    }

    return users;
  } catch (error) {
    console.log(error);

    // Offline or Firestore error
    return DEMO_PROFILES;
  }
}

export async function updateCurrentUser(
  data: Partial<UserProfile>
) {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

  await updateDoc(doc(db, "users", uid), data);
}