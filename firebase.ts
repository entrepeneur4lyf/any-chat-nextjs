import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyAfqZJxs2UbtZCspZuGBWPr_AaTuhgsrRI",
  authDomain: "any-chat-47898.firebaseapp.com",
  projectId: "any-chat-47898",
  storageBucket: "any-chat-47898.appspot.com",
  messagingSenderId: "2252675046",
  appId: "1:2252675046:web:139e1e777d4e26cc2be827",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
