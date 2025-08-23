// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    
    const navigate = useNavigate();

    const login = async (username, password) => {
        const response = await authService.login(username, password);
        if (response.data.accessToken) {
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
        }
        return response;
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};