import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  getDocs,
} from "firebase/firestore";

import { auth, db } from "../firebase/config";

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
  seen: boolean;
}

export async function sendMessage(
  matchId: string,
  text: string
) {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

  const message = text.trim();

  if (!message) return;

  await addDoc(
    collection(
      db,
      "matches",
      matchId,
      "messages"
    ),
    {
      senderId: uid,
      text: message,
      createdAt: serverTimestamp(),
      seen: false,
    }
  );

  // Update last message on match document
  await updateDoc(
    doc(db, "matches", matchId),
    {
      lastMessage: message,
      lastMessageAt: serverTimestamp(),
    }
  );
}

export function subscribeToMessages(
  matchId: string,
  callback: (
    messages: ChatMessage[]
  ) => void
) {
  return onSnapshot(
    query(
      collection(
        db,
        "matches",
        matchId,
        "messages"
      ),
      orderBy("createdAt", "asc")
    ),
    async (snapshot) => {
      const uid = auth.currentUser?.uid;

      const messages: ChatMessage[] =
        snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<
            ChatMessage,
            "id"
          >),
        }));

      callback(messages);

      // Mark received messages as seen
      if (!uid) return;

      const unseen = await getDocs(
        query(
          collection(
            db,
            "matches",
            matchId,
            "messages"
          ),
          where("senderId", "!=", uid),
          where("seen", "==", false)
        )
      );

      unseen.forEach(async (message) => {
        await updateDoc(message.ref, {
          seen: true,
        });
      });
    }
  );
}

/* -----------------------------
   Typing Status
--------------------------------*/

export async function setTyping(
  matchId: string,
  typing: boolean
) {
  const uid = auth.currentUser?.uid;

  if (!uid) return;

  await updateDoc(
    doc(db, "matches", matchId),
    {
      [`typing.${uid}`]: typing,
    }
  );
}

export function subscribeTyping(
  matchId: string,
  callback: (typing: any) => void
) {
  return onSnapshot(
    doc(db, "matches", matchId),
    (snapshot) => {
      callback(
        snapshot.data()?.typing || {}
      );
    }
  );
}