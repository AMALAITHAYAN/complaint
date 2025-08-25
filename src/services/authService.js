// src/services/authService.js
import axios from "axios";

// Base URL comes from CRA environment variable (fallback to localhost)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";
const API_URL = `${API_BASE}/api/auth`;

// Register a new user
const register = (username, email, password) =>
  axios.post(`${API_URL}/register`, { username, email, password });

// Login and persist tokens in localStorage
const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  const d = res.data || {}; // { accessToken, refreshToken, username, role }

  // 1) Merge into authUser (preserve any existing fields)
  const current = JSON.parse(localStorage.getItem("authUser") || "{}");
  const next = {
    ...current,
    username: d.username ?? current.username ?? username,
    role: d.role ?? current.role ?? null,
    accessToken: d.accessToken ?? current.accessToken ?? null,
    refreshToken: d.refreshToken ?? current.refreshToken ?? null,
  };
  localStorage.setItem("authUser", JSON.stringify(next));

  // 2) Also store tokens separately
  localStorage.setItem(
    "authTokens",
    JSON.stringify({
      accessToken: d.accessToken ?? null,
      refreshToken: d.refreshToken ?? null,
    })
  );

  // Debug logging
  console.log("authUser saved =>", next);
  console.log(
    "authTokens saved =>",
    JSON.parse(localStorage.getItem("authTokens"))
  );

  return res;
};

// Logout and clear stored tokens
const logout = () => {
  localStorage.removeItem("authUser");
  localStorage.removeItem("authTokens");
};

const authService = { register, login, logout };
export default authService;
