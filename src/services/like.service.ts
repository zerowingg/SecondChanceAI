import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export async function likeUser(targetUserId: string) {
  const currentUserId = auth.currentUser?.uid;

  if (!currentUserId) return false;

  // Save like
  await setDoc(
    doc(db, "likes", `${currentUserId}_${targetUserId}`),
    {
      from: currentUserId,
      to: targetUserId,
      createdAt: serverTimestamp(),
    }
  );

  // Check reverse like
  const reverseLike = await getDoc(
    doc(db, "likes", `${targetUserId}_${currentUserId}`)
  );

  if (reverseLike.exists()) {
    const matchId = [currentUserId, targetUserId]
      .sort()
      .join("_");

    await setDoc(
      doc(db, "matches", matchId),
      {
        users: [currentUserId, targetUserId],
        createdAt: serverTimestamp(),
      }
    );

    return true;
  }

  return false;
}