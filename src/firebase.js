import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBuTQL46QzYZLUuWRjvLlxDSiJaYT0dtY4",
  authDomain: "portfolio-my-c967c.firebaseapp.com",
  projectId: "portfolio-my-c967c",
  storageBucket: "portfolio-my-c967c.firebasestorage.app",
  messagingSenderId: "46497914706",
  appId: "1:46497914706:web:08b07d6278c4eb6210648b",
  measurementId: "G-SG56JR8XDN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});
export const storage = getStorage(app);
export default app;

