import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          authorizationParams: {
            redirect_uri: "http://localhost:5173/welcome",
          },
        })
      }
    >
      Sign-in
    </button>
  );
};

export default LoginButton;
