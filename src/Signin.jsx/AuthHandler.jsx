import { useEffect } from "react";
import { getAuth, getRedirectResult } from "firebase/auth";

const AuthHandler = () => {
  useEffect(() => {
    const auth = getAuth();
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          // Redirect or do something with user info here
          console.log("Redirect Success:", result.user);
          // Example: navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.error("Redirect Error:", error);
      });
  }, []);

  return <div>Authenticating...</div>;
};

export default AuthHandler;
