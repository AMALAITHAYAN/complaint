// src/services/api.js
import axios from "axios";

// Use CRA env var (fallback to localhost if not set)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

const api = axios.create({
  baseURL: `${API_BASE}/api`,
});

// 🔑 If you want JWT auth, uncomment this block
/*
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.accessToken) {
      config.headers["Authorization"] = "Bearer " + user.accessToken;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
*/

export default api;
