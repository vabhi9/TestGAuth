import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() =>
        loginWithRedirect({
          redirectUri: `${window.location.origin}/welcome`, // 👈 Must provide here too!
        })
      }
    >
      Sign-in
    </button>
  );
};

export default LoginButton;
