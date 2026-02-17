import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Example of what your api.js should look like
export const registerUser = async (userData) => {
  return await axios.post("http://localhost:8080/api/users/register", userData);
};

export const loginUser = async (loginData) => {
  return await axios.post("http://localhost:8080/api/users/login", loginData);
};

export default api;