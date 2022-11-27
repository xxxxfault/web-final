
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAsX5-oqC0_fw3YkLewWK2IGmd7Bt__1G8",
    authDomain: "web-final-a4283.firebaseapp.com",
    projectId: "web-final-a4283",
    storageBucket: "web-final-a4283.appspot.com",
    messagingSenderId: "14328955934",
    appId: "1:14328955934:web:c2475ce138550d0f8eda0f",
    measurementId: "G-FXJRZP8F62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);