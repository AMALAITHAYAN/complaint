// src/services/adminUserService.js
import axios from "axios";

// Base URL comes from CRA environment variable
// Fallback to localhost for dev if not set
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Shared axios instance
const api = axios.create({ baseURL: API_BASE });

// Only keep the relative path here
const BASE_PATH = "/api/users";

// Get all users
const getAllUsers = () => api.get(BASE_PATH);

// Create a new user
const createUser = (userData) => api.post(BASE_PATH, userData);

// Update an existing user
const updateUser = (id, userData) => api.put(`${BASE_PATH}/${id}`, userData);

// Delete a user
const deleteUser = (id) => api.delete(`${BASE_PATH}/${id}`);

const adminUserService = {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};

export default adminUserService;
