// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAu4limyePGzmwrWdirmhIA9v0xOocrzbk",
  authDomain: "clone-975e1.firebaseapp.com",
  projectId: "clone-975e1",
  storageBucket: "clone-975e1.appspot.com",
  messagingSenderId: "421505342110",
  appId: "1:421505342110:web:23fa2d3dfa7e37478a398f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
