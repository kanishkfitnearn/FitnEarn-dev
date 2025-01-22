import axios from "axios";

export const fetchData = async (url, params, options) => {
  try {
    const response = await axios.get(url, { params, ...options });
    return response.data;
  } catch (error) {
    console.error("API fetch error:", error);
    throw new Error("Failed to fetch data");
  }
};
