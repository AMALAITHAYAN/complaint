// src/services/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
});

/*
// THIS PART IS NOW DISABLED
api.interceptors.request.use(
    (config) => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user && user.accessToken) {
            config.headers['Authorization'] = 'Bearer ' + user.accessToken;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
*/

// You can also remove the response interceptor for now
// ...

export default api;