import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { enableNetwork } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "century-ai-e4d47.firebaseapp.com",
  projectId: "century-ai-e4d47",
  storageBucket: "century-ai-e4d47.appspot.com",
  messagingSenderId: "759047094542",
  appId: "1:759047094542:web:0782ee061474580422175f",
  measurementId: "G-1HZ3YTK88M",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
enableNetwork(db);
