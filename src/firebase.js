// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAuth, setPersistence, browserLocalPersistence, onAuthStateChanged } from "firebase/auth";
import { ref } from 'vue'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk1hSS_xbJGU2V7Ti0R_DGAhJkSw7xb_A",
  authDomain: "easylang-efbce.firebaseapp.com",
  projectId: "easylang-efbce",
  storageBucket: "easylang-efbce.firebasestorage.app",
  messagingSenderId: "574487795966",
  appId: "1:574487795966:web:873b5a2c6746d69807adaf",
  measurementId: "G-MT4QBE4T97"
};

// Initialize Firebase
export const fb = initializeApp(firebaseConfig);
export const auth = getAuth(fb);

// Persist auth across browser sessions / refreshes
setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Firebase auth persistence error:', error);
});

export const currentUser = ref(null);
onAuthStateChanged(auth, user => {
  currentUser.value = user;
});