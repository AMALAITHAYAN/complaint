// src/services/complaintService.js
import axios from 'axios';

// If you already have an axios instance (api.js), import that instead.
// import api from './api';
// and replace `axios` with `api` below.
const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  // withCredentials: true, // enable if your backend uses cookies
});

// ---------- READ ----------

// Full details + history/comments (GET /api/complaints/{id}/full)
export const getComplaintDetails = (id) =>
  API.get(`/complaints/${id}/full`);

// My complaints for an employee (GET /api/complaints/my?username=...)
export const getMyComplaints = (usernameOrObj) => {
  const username =
    typeof usernameOrObj === 'string'
      ? usernameOrObj
      : usernameOrObj?.username;

  return API.get('/complaints/my', { params: { username } });
};

// ---------- WRITE / MUTATIONS ----------

// Update workflow status
// Backend expects: PUT /api/complaints/{id}/workflow-status?username=...
// Body shape: { newStatus: 'IN_PROGRESS' | 'RESOLVED' | ..., note?: string }
export const updateComplaintStatus = (id, status, username, note = '') =>
  API.put(
    `/complaints/${id}/workflow-status`,
    { status, note }, // ✅ backend expects "status"
    { params: { username } }
  );


// Add a comment to a complaint
// POST /api/complaints/{id}/comments?username=...
// Body shape: { body: string, internal: boolean }
export const addComment = (complaintId, body, username, internal = false) =>
  API.post(
    `/complaints/${complaintId}/comments`,
    { body, internal },
    { params: { username } }
  );

// Submit a new complaint (multipart/form-data)
// POST /api/complaints
// Fields expected by backend: title, description, category?, files[], username (required), submittedBy?
export const submitComplaint = async (fields) => {
  const form = new FormData();
  form.append('title', fields.title);
  form.append('description', fields.description);
  if (fields.category != null) form.append('category', fields.category);
  if (fields.submittedBy != null) form.append('submittedBy', fields.submittedBy);
  // CRITICAL: backend uses this to attribute the ticket
  form.append('username', fields.username || '');

  if (fields.files) {
    for (const f of Array.from(fields.files)) {
      form.append('files', f, f.name);
    }
  }

  return API.post('/complaints', form);
};

// Default export for convenience (same methods)
const complaintService = {
  getMyComplaints,
  getComplaintDetails,
  updateComplaintStatus,
  addComment,
  submitComplaint,
};

export default complaintService;
