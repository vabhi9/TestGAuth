import React, { useEffect } from "react";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import GoogleButton from "react-google-button";
import { app } from "./firebase.js";
import signInWithGoogle from "./Google.js";

const GoogleSignup = () => {
  const auth = getAuth(app);
  // const user = auth.currentUser;
  const googleProvider = new GoogleAuthProvider();
  // const signInWithGoogle = () => {
  //   signInWithPopup(auth, googleProvider);
  // };
  // const openPopup = () => {
  //   const popup = window.open("https://example.com", "_blank", "noopener");
  // };
  // if (user) {
  //   console.log("UID", user.uid);
  // }
  return (
    <div>
      {/* <button onClick={signInWithGoogle}>Sign in With Google</button> */}
      <GoogleButton onClick={signInWithGoogle} />
    </div>
  );
};

export default GoogleSignup;
