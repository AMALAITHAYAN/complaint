// src/services/complaintService.js
import axios from "axios";

// Base URL comes from CRA env variable, fallback to localhost
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

// Create a shared axios instance
const API = axios.create({
  baseURL: `${API_BASE}/api`,
  // withCredentials: true, // enable if your backend uses cookies
});

// ---------- READ ----------

// Full details + history/comments (GET /api/complaints/{id}/full)
export const getComplaintDetails = (id) =>
  API.get(`/complaints/${id}/full`);

// My complaints for an employee (GET /api/complaints/my?username=...)
export const getMyComplaints = (usernameOrObj) => {
  const username =
    typeof usernameOrObj === "string"
      ? usernameOrObj
      : usernameOrObj?.username;

  return API.get("/complaints/my", { params: { username } });
};

// ---------- WRITE / MUTATIONS ----------

// Update workflow status
// PUT /api/complaints/{id}/workflow-status?username=...
// Body: { status, note? }
export const updateComplaintStatus = (id, status, username, note = "") =>
  API.put(
    `/complaints/${id}/workflow-status`,
    { status, note },
    { params: { username } }
  );

// Add a comment to a complaint
// POST /api/complaints/{id}/comments?username=...
// Body: { body, internal }
export const addComment = (complaintId, body, username, internal = false) =>
  API.post(
    `/complaints/${complaintId}/comments`,
    { body, internal },
    { params: { username } }
  );

// Submit a new complaint (multipart/form-data)
// POST /api/complaints
export const submitComplaint = async (fields) => {
  const form = new FormData();
  form.append("title", fields.title);
  form.append("description", fields.description);
  if (fields.category != null) form.append("category", fields.category);
  if (fields.submittedBy != null) form.append("submittedBy", fields.submittedBy);

  // CRITICAL: backend uses this to attribute the ticket
  form.append("username", fields.username || "");

  if (fields.files) {
    for (const f of Array.from(fields.files)) {
      form.append("files", f, f.name);
    }
  }

  return API.post("/complaints", form);
};

// Default export for convenience
const complaintService = {
  getMyComplaints,
  getComplaintDetails,
  updateComplaintStatus,
  addComment,
  submitComplaint,
};

export default complaintService;
