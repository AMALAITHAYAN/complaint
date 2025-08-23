import axios from 'axios';

const API_URL = 'http://localhost:8080/api/admin/complaints';

// Search/filter complaints
// params can be { status: 'OPEN', category: 'BILLING', etc. }
const searchComplaints = (params) => {
    return axios.get(API_URL, { params });
};

// Assign a complaint to an employee
const assignComplaint = (complaintId, employeeUsername) => {
    return axios.put(`${API_URL}/${complaintId}/assign`, {
        assignedToUsername: employeeUsername
    });
};

// Delete a complaint
const deleteComplaint = (complaintId) => {
    return axios.delete(`${API_URL}/${complaintId}`);
};

const adminComplaintService = {
    searchComplaints,
    assignComplaint,
    deleteComplaint,
};

export default adminComplaintService;