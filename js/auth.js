import { initializeApp } from "https://gstatic.com";
import { getAuth, validatePassword, signOut } from "firebase/auth";


import { 
  getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, 
  sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, signOut 
} from "https://gstatic.com";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Auth
export const firebaseConfig = {
  apiKey: "AIzaSyDNpIfAaaMkebfaCF_yvw-c96syUAzuAfY",
  authDomain: "hackers101-f36ec.firebaseapp.com",
  databaseURL: "https://hackers101-f36ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackers101-f36ec",
  storageBucket: "hackers101-f36ec.firebasestorage.app",
  messagingSenderId: "549407812574",
  appId: "1:549407812574:web:6f122016637eb20b3d0b4f",
  measurementId: "G-JF8B21M4KH"
};

// --- SIGN UP ---
export const signUp = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "index.html")
    .catch((err) => alert(err.message));
};

// --- LOGIN ---
export const login = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => window.location.href = "index.html")
    .catch((err) => alert(err.message));
};

// --- GOOGLE SIGN IN ---
export const loginWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then(() => window.location.href = "index.html")
    .catch((err) => alert(err.message));
};

// --- RESET PASSWORD ---
export const resetPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => alert("Reset email sent! Check your inbox."))
    .catch((err) => alert(err.message));
};

// --- LOGOUT ---
export const logout = () => signOut(auth).then(() => window.location.reload());
