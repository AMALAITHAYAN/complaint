import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reports';

const getStatusBreakdown = () => {
    return axios.get(`${API_URL}/status-breakdown`);
};

const getResolutionTime = () => {
    return axios.get(`${API_URL}/resolution-time`);
};

const getEmployeePerformance = () => {
    return axios.get(`${API_URL}/employee-performance`);
};

const reportService = {
    getStatusBreakdown,
    getResolutionTime,
    getEmployeePerformance,
};

export default reportService;