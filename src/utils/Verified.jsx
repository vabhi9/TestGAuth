import React, { useEffect } from "react";

const Welcome = () => {
//   const [params] = useSearchParams();
//   const navigate = useNavigate();
//   const auth = getAuth(app);

//   useEffect(() => {
//     const oobCode = params.get("oobCode");

//     if (oobCode) {
//       applyActionCode(auth, oobCode)
//         .then(() => {
//           // Email verified successfully
//           console.log("Email verified!");
//           setTimeout(() => navigate("/welcome"), 2000);
//         })
//         .catch((err) => {
//           console.error("Verification failed:", err.message);
//         });
//     }
//   }, []);

  return (
    <div className="h-screen flex items-center justify-center flex-col bg-blue-50">
      <h1 className="text-3xl font-bold text-blue-700">
        📧 Verifying your email...
      </h1>
      <p className="mt-4 text-gray-600">Hold tight! Redirecting shortly...</p>
    </div>
  );
};

export default Welcome;
