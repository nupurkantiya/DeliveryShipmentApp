// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: " .......",
  authDomain: "........ ",
  projectId: "........ ",
  storageBucket: ".....",
  messagingSenderId: ".....",
  appId: "......",
  measurementId: "......"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const timestamp = serverTimestamp;

