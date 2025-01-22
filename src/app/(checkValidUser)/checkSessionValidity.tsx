"use client";
import axios from "axios";
import Cookies from "js-cookie";

const checkSessionValidity = async () => {
  const apiEndpoint =  process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;
  const token = Cookies.get("genToken");
  //console.log("Token from cookies:", token);

  if (!token) {
    //console.log("Token is not there");
    return { success: false, message: "No token found" };
  }

  try {
    const response = await axios.get(
      `${apiEndpoint}/api/fitnearn/web/users/check-session-validity?token=${token}`,
    );
    //console.log("API response:", response.data);
    return response.data;
  } catch (error) {
    //console.error("Error checking session:", error);
    return { success: false, message: "Error checking session" };
  }
};

export default checkSessionValidity;
