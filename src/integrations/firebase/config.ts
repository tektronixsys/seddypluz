import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjCI7Z_KB4WLtEAIqZQ700dif1g3d3rS0",
  authDomain: "seddypluz.firebaseapp.com",
  projectId: "seddypluz",
  storageBucket: "seddypluz.firebasestorage.app",
  messagingSenderId: "717844264438",
  appId: "1:717844264438:web:06f8b001bc78b4e7c283d7",
  measurementId: "G-LLGXNNQ41R",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Initialize Analytics (only in browser environments)
export const analytics =
  typeof window !== "undefined"
    ? isSupported().then((yes) => (yes ? getAnalytics(app) : null))
    : null;
