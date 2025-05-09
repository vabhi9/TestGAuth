import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            redirect_uri: "https://testgauth.onrender.com/welcome",
          },
        })
      }
    >
      Sign-in
    </button>
  );
};

export default LoginButton;
