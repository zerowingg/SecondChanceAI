import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBnfq_tmiIWN-0MEJB6uosafHRVfP5pP_k",
  authDomain: "secondchanceai-official.firebaseapp.com",
  projectId: "secondchanceai-official",
  storageBucket: "secondchanceai-official.firebasestorage.app",
  messagingSenderId: "1025166722534",
  appId: "1:1025166722534:web:9fa2e90e912732d2bf4227",
};

const app = initializeApp(firebaseConfig);

// Firebase Authentication
export const auth = getAuth(app);

// Firestore Database
export const db = getFirestore(app);

// Firebase Storage
export const storage = getStorage(app);

export default app;