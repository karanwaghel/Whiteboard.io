import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDuK1bljcwzRMLqzg7I0UbSnu9OuDfvtUM",
  authDomain: "trial-base-820ac.firebaseapp.com",
  projectId: "trial-base-820ac",
  storageBucket: "trial-base-820ac.firebasestorage.app",
  messagingSenderId: "185047279616",
  appId: "1:185047279616:web:decaecea4f07d2134550e5",
  measurementId: "G-SFNBZKFVTJ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const GoogleProvider =new GoogleAuthProvider();
export const db= getFirestore(app)
