// src/services/reportService.js
import axios from "axios";

// Base URL from CRA env variable, fallback to localhost for dev
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Create a shared axios instance
const api = axios.create({ baseURL: API_BASE });

// Only keep the path here
const BASE_PATH = "/api/reports";

// Get complaint status breakdown
const getStatusBreakdown = () => api.get(`${BASE_PATH}/status-breakdown`);

// Get average resolution time
const getResolutionTime = () => api.get(`${BASE_PATH}/resolution-time`);

// Get employee performance report
const getEmployeePerformance = () =>
  api.get(`${BASE_PATH}/employee-performance`);

const reportService = {
  getStatusBreakdown,
  getResolutionTime,
  getEmployeePerformance,
};

export default reportService;
