import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyDAG-M5S6naOZumW_5vfINDxsSEb_-plVs",
  authDomain: "fantasy-manager-38b9e.firebaseapp.com",
  projectId: "fantasy-manager-38b9e",
  storageBucket: "fantasy-manager-38b9e.appspot.com",
  messagingSenderId: "848091872980",
  appId: "1:848091872980:web:5010208cd999e1ecdc8541",
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
