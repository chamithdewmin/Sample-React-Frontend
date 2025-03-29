import axios from "axios";

const API_URL = "http://localhost:8080/my-app";

export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`http://localhost:8080/my-app/loginUser`, { username, password });
    return response.data;
  } catch (error) {
    throw new Error("Login failed. Please try again.");
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`http://localhost:8080/my-app/patients`, userData);
    return response.data;
  } catch (error) {
    throw new Error("Registration failed. Please try again.");
  }
};
