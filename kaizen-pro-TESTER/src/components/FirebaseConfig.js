import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyASzhSHds9E44109MlXNgzEFE4kMUDd8Uc",
  authDomain: "kaizen-976b0.firebaseapp.com",
  databaseURL: "https://kaizen-976b0-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "kaizen-976b0",
  storageBucket: "kaizen-976b0.appspot.com",
  messagingSenderId: "468034222380",
  appId: "1:468034222380:web:d33e1ea069d375dfdcd489",
  measurementId: "G-DMEYPDES24"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize Firebase Auth
const db = getFirestore(app); // Initialize Firestore

export { auth, db };