import {
  doc,
 getDoc,
 setDoc,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export async function likeUser(targetUserId: string) {
  const currentUserId = auth.currentUser?.uid;

  if (!currentUserId) return false;

  // Store current user's like
  await setDoc(
    doc(
      db,
      "likes",
      `${currentUserId}_${targetUserId}`
    ),
    {
      from: currentUserId,
      to: targetUserId,
      createdAt: Date.now(),
    }
  );

  // Check reverse like
  const reverseLike = await getDoc(
    doc(
      db,
      "likes",
      `${targetUserId}_${currentUserId}`
    )
  );

  // If reverse like exists -> it's a match
  if (reverseLike.exists()) {
    await setDoc(
      doc(
        db,
        "matches",
        `${currentUserId}_${targetUserId}`
      ),
      {
        users: [currentUserId, targetUserId],
        createdAt: Date.now(),
      }
    );

    return true;
  }

  return false;
}