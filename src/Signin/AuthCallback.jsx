import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const AuthCallback = () => {
  const { handleRedirectCallback, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const processRedirect = async () => {
      await handleRedirectCallback(); // finish login
      navigate("/signin"); // then go to your Sin page
    };
    processRedirect();
  }, []);

  if (isLoading) return <div>Loading authentication...</div>;

  return <div>Loading authentication...</div>;
};

export default AuthCallback;
