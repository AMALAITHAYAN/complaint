// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth';

const register = (username, email, password) =>
  axios.post(`${API_URL}/register`, { username, email, password });

const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/login`, { username, password });
  const d = res.data || {}; // { accessToken, refreshToken, username, role }

  // 1) Merge into authUser (preserve any existing fields)
  const current = JSON.parse(localStorage.getItem('authUser') || '{}');
  const next = {
    ...current,
    username: d.username ?? current.username ?? username,
    role: d.role ?? current.role ?? null,
    accessToken: d.accessToken ?? current.accessToken ?? null,
    refreshToken: d.refreshToken ?? current.refreshToken ?? null,
  };
  localStorage.setItem('authUser', JSON.stringify(next));

  // 2) Also store tokens separately so you can see them even if some other code rewrites authUser later
  localStorage.setItem('authTokens', JSON.stringify({
    accessToken: d.accessToken ?? null,
    refreshToken: d.refreshToken ?? null,
  }));

  // Debug print so you can verify immediately in Console
  console.log('authUser saved =>', next);
  console.log('authTokens saved =>', JSON.parse(localStorage.getItem('authTokens')));

  return res;
};

const logout = () => {
  localStorage.removeItem('authUser');
  localStorage.removeItem('authTokens');
};

export default { register, login, logout };
