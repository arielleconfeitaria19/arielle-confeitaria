import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA2wJAidBQMmyEki90Ur5NivLobh8lxu1Y",
  authDomain: "arielle-confeitaria-c8282.firebaseapp.com",
  projectId: "arielle-confeitaria-c8282",
  storageBucket: "arielle-confeitaria-c8282.firebasestorage.app",
  messagingSenderId: "619669394494",
  appId: "1:619669394494:web:a837d07c20c16333536d6f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);