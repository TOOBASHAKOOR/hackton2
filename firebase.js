
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";

import { getAuth ,signOut ,createUserWithEmailAndPassword ,updateProfile,signInWithEmailAndPassword,onAuthStateChanged,sendEmailVerification, updateEmail, updatePassword, deleteUser, signInWithPopup, GoogleAuthProvider, } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

import { getFirestore, collection, addDoc, onSnapshot,query,where, } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";





const firebaseConfig = {
    apiKey: "AIzaSyCP9QM4gVgyKRgAt5IIAWwbK6vgTcb2NMg",
  authDomain: "demoproject-a-6a550.firebaseapp.com",
  projectId: "demoproject-a-6a550",
  storageBucket: "demoproject-a-6a550.firebasestorage.app",
  messagingSenderId: "1029036910489",
  appId: "1:1029036910489:web:52b8aa1c10a1f4f2b35508",
  measurementId: "G-ZRKYWDVELM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const db = getFirestore(app)

export {db,collection, addDoc, getAuth,signOut ,createUserWithEmailAndPassword,updateProfile, signInWithEmailAndPassword,onAuthStateChanged ,sendEmailVerification, updateEmail, updatePassword, deleteUser, signInWithPopup, GoogleAuthProvider, auth, onSnapshot,query,where, }
