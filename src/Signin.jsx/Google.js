import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "./firebase";
import axios from "axios";

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const signInWithGoogle = async () => {
  // try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userData = {
      uid: user.uid,
      name: user.displayName || "No Name",
      email: user.email,
      createdAt: user.metadata.creationTime,
      lastLogin: user.metadata.lastSignInTime,
      provider: user.providerData[0]?.providerId,
    };
    console.log("User:", userData);
    // You can store or use user data here
    // await axios.post(
    //   "http://localhost:7000/api/v1/googleAuth/register/User",
    //   userData
    // );
    console.log("User data sent to backend:", userData);
  // } catch (error) {
    // if (error.code === "auth/popup-closed-by-user") {
    //   console.warn("User closed the popup.", error);
    //   console.error("Full Error Object:", JSON.stringify(error, null, 2));
    // } else {
      // console.error(error);
    // }
  // }
};

export default signInWithGoogle;
