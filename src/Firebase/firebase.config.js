// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI8qlOfexNDJDbLxkPa7D0kIDxhKnic9k",
  authDomain: "module-50-51-auth-privateroute.firebaseapp.com",
  projectId: "module-50-51-auth-privateroute",
  storageBucket: "module-50-51-auth-privateroute.appspot.com",
  messagingSenderId: "895500342807",
  appId: "1:895500342807:web:21538c8ed460b1d484ee52"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;