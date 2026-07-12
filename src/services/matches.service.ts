import {
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";
import { getUserById } from "./user.service";
import { UserProfile } from "../types/user";

export interface Match extends UserProfile {
  matchId: string;
  lastMessage?: string;
  lastMessageAt?: any;
}

export async function getMatches(): Promise<Match[]> {
  try {
    const currentUserId = auth.currentUser?.uid;

    if (!currentUserId) {
      return [];
    }

    const snapshot = await getDocs(
      query(
        collection(db, "matches"),
        where("users", "array-contains", currentUserId)
      )
    );

    const matches: Match[] = [];

    for (const document of snapshot.docs) {
      const data = document.data();

      const users = data.users || [];

      const otherUserId = users.find(
        (id: string) => id !== currentUserId
      );

      if (!otherUserId) continue;

      const profile = await getUserById(otherUserId);

      if (!profile) continue;

      matches.push({
        ...profile,
        matchId: document.id,
        lastMessage: data.lastMessage ?? "",
        lastMessageAt:
          data.lastMessageAt ??
          data.createdAt ??
          null,
      });
    }

    matches.sort((a, b) => {
      const first =
        a.lastMessageAt?.seconds || 0;

      const second =
        b.lastMessageAt?.seconds || 0;

      return second - first;
    });

    return matches;
  } catch (error) {
    console.log("MATCHES ERROR:", error);

    return [];
  }
}