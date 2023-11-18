// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAtolt3-bi_hmYUgL7H-0TagvUknD8e9CY",
  authDomain: "no-friends-e-shop.firebaseapp.com",
  projectId: "no-friends-e-shop",
  storageBucket: "no-friends-e-shop.appspot.com",
  messagingSenderId: "313188098760",
  appId: "1:313188098760:web:6bfa0c3d0953ea11c47bfd",
  measurementId: "G-QY1TZESZ5T"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
