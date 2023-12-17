import axios from "axios";
import { API_URL_BASE } from "../utils/apiURL";

export const ddLogin = async (data) => {
  console.log(`${API_URL_BASE}/login`);
  try {
    let result = await axios(`${API_URL_BASE}/login`,{
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      'mode': 'no-cors'
    },

    data: data,
  });
  return result;
  } catch (error) {
    return error
  }
  
};
