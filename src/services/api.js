import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add auth token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== User API calls ==========

// Register - maps frontend fields to backend User entity fields
export const registerUser = async (userData) => {
  const payload = {
    user_name: `${userData.firstName} ${userData.lastName}`,
    user_mail: userData.email,
    user_password: userData.password,
    user_role: userData.role || "Customer",
  };
  return await api.post("/users/register", payload);
};

// Login - maps frontend fields to backend expected fields
export const loginUser = async (loginData) => {
  const payload = {
    user_mail: loginData.email,
    user_password: loginData.password,
  };
  return await api.post("/users/login", payload);
};

// ========== Booking API calls ==========

// Create booking from frontend form
export const createBooking = async (bookingData) => {
  const userId = localStorage.getItem("userId");
  const payload = {
    ...bookingData,
    userId: userId ? parseInt(userId) : null,
  };
  return await api.post("/bookings", payload);
};

// Fetch all bookings
export const getBookings = async () => {
  return await api.get("/bookings/fetch");
};

// ========== Payment API calls ==========

// Create payment after booking
export const createPayment = async (paymentData) => {
  const userId = localStorage.getItem("userId");
  return await api.post("/payments", {
    ...paymentData,
    userId: userId ? parseInt(userId) : null,
  });
};

// ========== Services API calls ==========

// Fetch all services from backend
export const getServices = async () => {
  return await api.get("/services/fetch");
};

export default api;
