import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-analytics.js";

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, signOut } from "https://www.gstatic.com/firebasejs/12.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNpIfAaaMkebfaCF_yvw-c96syUAzuAfY",
  authDomain: "hackers101-f36ec.firebaseapp.com",
  databaseURL: "https://hackers101-f36ec-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "hackers101-f36ec",
  storageBucket: "hackers101-f36ec.firebasestorage.app",
  messagingSenderId: "549407812574",
  appId: "1:549407812574:web:6f122016637eb20b3d0b4f",
  measurementId: "G-JF8B21M4KH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//
export function login() {
  var email = document.getElementById('email').value;
  var password = password = document.getElementById('pass').value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      alert("Login successful! Welcome, " + email);
      window.location.href = "./home.html";
      // ...
  })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
  });
}

export function googleLogin() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...

      alert("Google Login successful! Welcome, " + user.email);
      window.location.href = '../index.html';
  }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      alert("Error: " + email + " " + errorMessage);
      // ...
  });
}

export function resetPassword() {
  var email = document.getElementById('email').value;

  const auth = getAuth();
  sendPasswordResetEmail(auth, email)
  .then(() => {
      // Password reset email sent!
      // ..
      alert("Password reset email sent to " + email);
  })
  .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert("Error: " + errorMessage);
  });

}

export function signup() {
  var email = document.getElementById('email').value;
  var password = password = document.getElementById('pass').value;

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        alert("Sign up successful! Welcome, " + user.email);
        window.location.href = '../index.html'; 
        // ...
  })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert("Error: " + errorMessage);
    });
}

export function logout() {
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    alert("Logged out successfully");
  }).catch((error) => {
    // An error happened.
    console.error("Error logging out:", error);
  });
}