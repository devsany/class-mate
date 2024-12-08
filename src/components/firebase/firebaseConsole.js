// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC10BfnuBcTBa6mrWnnqIR62JEuVCIljFc",
  authDomain: "classmate-1e225.firebaseapp.com",
  databaseURL:
    "https://classmate-1e225-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "classmate-1e225",
  storageBucket: "classmate-1e225.firebasestorage.app",
  messagingSenderId: "286696336116",
  appId: "1:286696336116:web:05fde842c0f8fff64b4ca1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
