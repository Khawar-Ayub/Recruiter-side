// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "wehire-44d81.firebaseapp.com",
  databaseURL:
    "https://wehire-44d81-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "wehire-44d81",
  storageBucket: "wehire-44d81.appspot.com",
  messagingSenderId: "38766377171",
  appId: "1:38766377171:web:09ad7aa9c1ab3efb003c26",
  measurementId: "G-YQM48N6SH8",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const database = getDatabase();

export default database;
