// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC70ugZz09nRQehsu6YoMnDJMoEi2sNb_U",
  authDomain: "clone-1d6df.firebaseapp.com",
  projectId: "clone-1d6df",
  storageBucket: "clone-1d6df.appspot.com",
  messagingSenderId: "279593191559",
  appId: "1:279593191559:web:e076e4d859fbd758a4d022",
  measurementId: "G-QTGSBC89GD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const provider = new GoogleAuthProvider()
export const auth = getAuth()
export default app;
