import axios from "axios";

let alreadySent = false;

const sendUserData = async (user) => {
  if (alreadySent) return;
  alreadySent = true;

  try {
    await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/v1/googleAuth/register/User`,
      {
        name: user.name,
        email: user.email,
        auth0Id: user.sub,
        picture: user.picture,
        // add more fields if needed
      }
    )
  } catch (error) {
    console.error("Failed to send user data:", error);
  }
};

export default sendUserData;
