import axios from 'axios';

const API_URL = 'http://localhost:8080/api/users';

const getAllUsers = () => {
    return axios.get(API_URL);
};

// --- ADD THIS FUNCTION ---
const createUser = (userData) => {
    return axios.post(API_URL, userData);
};
// -------------------------

const updateUser = (id, userData) => {
    return axios.put(`${API_URL}/${id}`, userData);
};

const deleteUser = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const adminUserService = {
    getAllUsers,
    createUser, // <-- Add to export
    updateUser,
    deleteUser,
};

export default adminUserService;