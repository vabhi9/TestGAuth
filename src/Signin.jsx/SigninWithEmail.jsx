// import React, { useState } from "react";
// import { sendEmailVerification } from "firebase/auth";
// import { HiOutlineMail } from "react-icons/hi";
// import { RiLockPasswordFill } from "react-icons/ri";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// import { app } from "./firebase.js";
// import GoogleSignup from "./GoogleAuth.jsx";
// import axios from "axios";

// const auth = getAuth(app);
// // const user = auth.currentUser;

// const SigninWithEmail = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [status, setStatus] = useState("idle");
//   // const [errorMsg, setErrorMsg] = useState("");

//   const createdUser = async () => {
//     setStatus("loading");
//     // setErrorMsg("");

//     // try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Send email verification
//       await sendEmailVerification(user, {
//         url: "http://localhost:5173/VerifiedSuccessFully",
//         handleCodeInApp: true,
//       });
//       const extractNameFromEmail = (email) => {
//         return email
//           .split("@")[0]
//           .replace(/[^a-zA-Z]/g, " ") // remove digits/symbols
//           .replace(/\s+/g, " ") // normalize spaces
//           .trim()
//           .replace(/^\w/, (c) => c.toUpperCase()); // capitalize
//       };

//       const extractedName = extractNameFromEmail(user.email);

//       // Prepare data
//       const userData = {
//         uid: user.uid,
//         name: extractedName,
//         email: user.email,
//         // name: user.displayName,
//         createdAt: user.metadata.creationTime,
//         lastLogin: user.metadata.lastSignInTime,
//         provider: user.providerData[0]?.providerId,
//       };

//       // Send to backend
//       // try {
//         await axios.post(
//           "http://localhost:7000/api/v1/googleAuth/register/User",
//           userData
//         );
//       // } 
//       // catch (err) {
//       //   console.log("AXIOS ERROR:", err.response?.data || err.message);
//       // }

//       // Sign out the user after sending verification
//       await auth.signOut();

//       setStatus("success");
//       setEmail("");
//       setPassword("");

//       setTimeout(() => {
//         setStatus("idle");
//         alert("Verification email sent! ✅\nPlease check your inbox.");
//       }, 3000);
//     // } catch (error) {
//       // console.error("Firebase Error:", error);
//       setStatus("error");
//       // setErrorMsg(error.message || "An unexpected error occurred.");
//       setTimeout(() => setStatus("idle"), 3000);
//     // }
//   };

//   const getButtonLabel = () => {
//     switch (status) {
//       case "loading":
//         return "Creating...";
//       case "success":
//         return "Created Successfully ✅";
//       case "error":
//         return "Something went wrong ❌";
//       default:
//         return "Create Account";
//     }
//   };

//   return (
//     <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-slate-300">
//       <section className="h-[80%] w-[80%] flex z-50 shadow-slate-500 shadow-xl overflow-hiddn rounded-3xl">
//         <div className="basis-1/2 bg-white flex flex-col justify-center items-center rounded-s-3xl">
//           <div className="h-[80%] w-[60%] bg-re-500 flex flex-col justify-around items-start">
//             <h1 className="font-semibold text-3xl">Log in to Your Account</h1>
//             {/* <p className="text-gray-10">Welcome back!</p> */}
//             <div className="h-12 w-full flex justify-center items-center">
//               <GoogleSignup />
//             </div>
//             <div className="flex items-center w-full my-2">
//               <hr className="flex-grow border-gray-400" />
//               <p className="mx-2 text-gray-700 whitespace-nowrap">
//                 or Continue with Email
//               </p>
//               <hr className="flex-grow border-gray-400" />
//             </div>
//             <div className="relative w-full">
//               <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
//               <input
//                 type="text"
//                 name="email"
//                 id="email"
//                 placeholder="Email"
//                 className="h-9 w-full pl-10 rounded-lg border-[1px] border-black focus:outline-none"
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//               />
//             </div>
//             <div className="relative w-full">
//               <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
//               <input
//                 type="password"
//                 name="password"
//                 id="password"
//                 placeholder="Password"
//                 className="h-9 w-full pl-10 rounded-lg border-[1px] border-black focus:outline-none"
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//               />
//             </div>
//             <div className="h-5 w-full flex justify-end items-center">
//               <p className="text-sm hover:cursor-pointer">Forgot Password</p>
//             </div>
//             <button
//               className="w-full bg-Primary p-2 rounded-xl font-bold text-xl active:scale-[0.85] duration-700 text-white"
//               onClick={createdUser}
//             >
//               {getButtonLabel()}
//             </button>
//           </div>
//         </div>
//         <div className="basis-1/2 bg-Primary rounded-r-3xl ">Image</div>
//       </section>
//     </div>
//   );
// };

// export default SigninWithEmail;




import React, { useState, useEffect } from "react";
import {
  sendEmailVerification,
  getRedirectResult,
  getAuth,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { app } from "./firebase.js";
import GoogleSignup from "./GoogleAuth.jsx";
import axios from "axios";

const auth = getAuth(app);

const SigninWithEmail = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const fetchGoogleRedirectUser = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          const user = result.user;
          const userData = {
            uid: user.uid,
            name: user.displayName || "No Name",
            email: user.email,
            createdAt: user.metadata.creationTime,
            lastLogin: user.metadata.lastSignInTime,
            provider: user.providerData[0]?.providerId,
          };
          console.log("Google Redirect User:", userData);

          await axios.post(
            "http://localhost:7000/api/v1/googleAuth/register/User",
            userData
          );
        }
      } catch (err) {
        console.error("Google Redirect Error:", err);
      }
    };
    fetchGoogleRedirectUser();
  }, []);

  const createdUser = async () => {
    setStatus("loading");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await sendEmailVerification(user, {
        url: "http://localhost:5173/VerifiedSuccessFully",
        handleCodeInApp: true,
      });

      const extractNameFromEmail = (email) => {
        return email
          .split("@")[0]
          .replace(/[^a-zA-Z]/g, " ")
          .replace(/\s+/g, " ")
          .trim()
          .replace(/^\w/, (c) => c.toUpperCase());
      };

      const extractedName = extractNameFromEmail(user.email);

      const userData = {
        uid: user.uid,
        name: extractedName,
        email: user.email,
        createdAt: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime,
        provider: user.providerData[0]?.providerId,
      };

      await axios.post(
        "http://localhost:7000/api/v1/googleAuth/register/User",
        userData
      );

      await auth.signOut();
      setStatus("success");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        setStatus("idle");
        alert("Verification email sent! ✅\nPlease check your inbox.");
      }, 3000);
    } catch (error) {
      console.error("Firebase Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const getButtonLabel = () => {
    switch (status) {
      case "loading":
        return "Creating...";
      case "success":
        return "Created Successfully ✅";
      case "error":
        return "Something went wrong ❌";
      default:
        return "Create Account";
    }
  };

  return (
    <div className="h-[100vh] w-[100vw] flex justify-center items-center bg-slate-300">
      <section className="h-[80%] w-[80%] flex z-50 shadow-slate-500 shadow-xl overflow-hiddn rounded-3xl">
        <div className="basis-1/2 bg-white flex flex-col justify-center items-center rounded-s-3xl">
          <div className="h-[80%] w-[60%] bg-re-500 flex flex-col justify-around items-start">
            <h1 className="font-semibold text-3xl">Log in to Your Account</h1>
            <div className="h-12 w-full flex justify-center items-center">
              <GoogleSignup />
            </div>
            <div className="flex items-center w-full my-2">
              <hr className="flex-grow border-gray-400" />
              <p className="mx-2 text-gray-700 whitespace-nowrap">
                or Continue with Email
              </p>
              <hr className="flex-grow border-gray-400" />
            </div>
            <div className="relative w-full">
              <HiOutlineMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="h-9 w-full pl-10 rounded-lg border-[1px] border-black focus:outline-none"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="relative w-full">
              <RiLockPasswordFill className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 " />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="h-9 w-full pl-10 rounded-lg border-[1px] border-black focus:outline-none"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="h-5 w-full flex justify-end items-center">
              <p className="text-sm hover:cursor-pointer">Forgot Password</p>
            </div>
            <button
              className="w-full bg-Primary p-2 rounded-xl font-bold text-xl active:scale-[0.85] duration-700 text-white"
              onClick={createdUser}
            >
              {getButtonLabel()}
            </button>
          </div>
        </div>
        <div className="basis-1/2 bg-Primary rounded-r-3xl ">Image</div>
      </section>
    </div>
  );
};

export default SigninWithEmail;
