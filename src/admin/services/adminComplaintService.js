// src/services/adminComplaintService.js
import axios from "axios";

// Read API base from CRA env (fallback to localhost if not set)
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Create a shared axios instance
const api = axios.create({ baseURL: API_BASE });

// Only keep the path here; baseURL comes from env
const BASE_PATH = "/api/admin/complaints";

// Search/filter complaints
// params can be { status: 'OPEN', category: 'BILLING', etc. }
const searchComplaints = (params) => api.get(BASE_PATH, { params });

// Assign a complaint to an employee
const assignComplaint = (complaintId, employeeUsername) =>
  api.put(`${BASE_PATH}/${complaintId}/assign`, {
    assignedToUsername: employeeUsername,
  });

// Delete a complaint
const deleteComplaint = (complaintId) => api.delete(`${BASE_PATH}/${complaintId}`);

const adminComplaintService = {
  searchComplaints,
  assignComplaint,
  deleteComplaint,
};

export default adminComplaintService;
