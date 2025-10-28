import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMSsIlseHlHkzGj8D7InD3ub0rPt7gK7w",
  authDomain: "tic-tac-toe-online-dbf10.firebaseapp.com",
  projectId: "tic-tac-toe-online-dbf10",
  storageBucket: "tic-tac-toe-online-dbf10.firebasestorage.app",
  messagingSenderId: "220020948023",
  appId: "1:220020948023:web:3ffe5d4f927d1943fc93b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
