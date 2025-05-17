// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtIERHQs__OtNugzrFFswM1gFfSFLGUCo",
  authDomain: "busticket-c8f4d.firebaseapp.com",
  projectId: "busticket-c8f4d",
  storageBucket: "busticket-c8f4d.firebasestorage.app",
  messagingSenderId: "987760897807",
  appId: "1:987760897807:web:9c8408300256a71a70187a",
  measurementId: "G-09HF0R7RX6"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);


export { db, auth, collection, addDoc, createUserWithEmailAndPassword, signInWithEmailAndPassword };

// Initialize Firebase
