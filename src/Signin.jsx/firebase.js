import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// const auth = getAuth();


const firebaseConfig = {
  apiKey: "AIzaSyC4q5LsrEv-b-2nGSSYhiw_QA6EmYxw6Fk",
  // authDomain: "mdivine-ecom.firebaseapp.com",
  authDomain: "http://testgauth.onrender.com/",
  projectId: "mdivine-ecom",
  storageBucket: "mdivine-ecom.firebasestorage.app",
  messagingSenderId: "540709082171",
  appId: "1:540709082171:web:bbc7f64e1ba0c25fa7381e",
  measurementId: "G-GY7GV7E6S0",
};

export const app = initializeApp(firebaseConfig);
