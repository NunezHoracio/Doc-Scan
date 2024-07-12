import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBUohmPz1k7GpmXm068SkzpyzdIOiLTDgM",
  authDomain: "document-scan-c783d.firebaseapp.com",
  projectId: "document-scan-c783d",
  storageBucket: "document-scan-c783d.appspot.com",
  messagingSenderId: "260141050519",
  appId: "1:260141050519:web:b3ee34adb3ea531a8a17d2"
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
export default firebaseApp;