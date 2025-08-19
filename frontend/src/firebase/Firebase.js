// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANHxPEII8IFCZglK2vFcl0-1IJpvl0ecA",
  authDomain: "course-track-fb2fa.firebaseapp.com",
  projectId: "course-track-fb2fa",
  storageBucket: "course-track-fb2fa.firebasestorage.app",
  messagingSenderId: "1048869674721",
  appId: "1:1048869674721:web:9cabbd7d8137af18c261a0",
  measurementId: "G-FG3C7KH99E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {auth, app};