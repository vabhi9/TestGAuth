import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import sendUserData from "./sendUserData.js";
import LogoutButton from "./Logout.jsx";

const Sin = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  useEffect(() => {
    const sendSecureData = async () => {
      if (isAuthenticated && user) {
        // const token = await getAccessTokenSilently();
        await sendUserData(user); // pass the token along
      }
    };

    sendSecureData();
  }, [isAuthenticated, user]);

  if (isLoading === true) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      {isAuthenticated && (
        <div>
          <h3>Welcome {user?.name}</h3>
          <img src={user?.picture} alt="" width="100" height={100} />
          {/* <h1>{user?.gender}</h1> */}
          <LogoutButton />
        </div>
      )}
    </div>
  );
};

export default Sin;
