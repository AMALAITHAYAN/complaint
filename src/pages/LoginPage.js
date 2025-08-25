import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService'; // We will call the service directly

// --- DYNAMIC BACKGROUND COMPONENT ---
const Background = () => (
  <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: '#111827', overflow: 'hidden' }}>
    <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(29, 78, 216, 0.3) 0%, rgba(29, 78, 216, 0) 60%)', animation: 'spin 20s linear infinite' }}></div>
    <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
  </div>
);

// --- STYLES COMPONENT ---
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
    .auth-wrapper { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: 'Poppins', sans-serif; }
    .auth-card { width: 420px; padding: 2.5rem; background: rgba(23, 31, 46, 0.85); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 20px; backdrop-filter: blur(10px); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37); color: #fff; }
    .auth-header { text-align: center; margin-bottom: 2.5rem; }
    .auth-header h1 { font-size: 2rem; margin: 0; font-weight: 700; }
    .auth-header p { font-size: 1rem; color: #a0aec0; margin-top: 0.5rem; }
    .input-group { margin-bottom: 1.5rem; }
    .input-label { display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 500; color: #a0aec0; }
    .input-field { width: 100%; padding: 0.8rem 1rem; background: rgba(0, 0, 0, 0.3); border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 10px; color: #fff; font-size: 1rem; transition: all 0.3s ease; }
    .input-field:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5); }
    .submit-btn { width: 100%; padding: 1rem; border-radius: 10px; border: none; background-color: #3b82f6; color: #fff; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease, transform 0.2s ease; margin-top: 1rem; }
    .submit-btn:hover { background-color: #2563eb; transform: translateY(-2px); }
    .submit-btn:disabled { background-color: #555; cursor: not-allowed; }
    .quick-login-section { margin-top: 1.5rem; }
    .quick-login-divider { text-align: center; margin: 1.5rem 0; color: #a0aec0; font-size: 0.9rem; position: relative; }
    .quick-login-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: rgba(255, 255, 255, 0.1); }
    .quick-login-divider span { background: rgba(23, 31, 46, 0.85); padding: 0 1rem; }
    .quick-login-buttons { display: flex; gap: 1rem; }
    .quick-login-btn { flex: 1; padding: 0.8rem 1rem; border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.2); background: rgba(255, 255, 255, 0.1); color: #fff; font-size: 0.95rem; font-weight: 500; cursor: pointer; transition: all 0.3s ease; text-decoration: none; display: block; text-align: center; }
    .quick-login-btn:hover { background: rgba(255, 255, 255, 0.2); transform: translateY(-1px); border-color: rgba(255, 255, 255, 0.3); }
    .quick-login-btn.admin { border-color: rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.1); }
    .quick-login-btn.admin:hover { background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.5); }
    .quick-login-btn.employee { border-color: rgba(34, 197, 94, 0.3); background: rgba(34, 197, 94, 0.1); }
    .quick-login-btn.employee:hover { background: rgba(34, 197, 94, 0.2); border-color: rgba(34, 197, 94, 0.5); }
    .auth-footer { text-align: center; margin-top: 1.5rem; color: #a0aec0; }
    .auth-footer a { color: #3b82f6; text-decoration: none; font-weight: 500; }
    .auth-footer a:hover { text-decoration: underline; }
    .message { text-align: center; padding: 1rem; margin-top: 1.5rem; border-radius: 8px; font-weight: 500; }
    .message.error { background-color: rgba(239, 68, 68, 0.2); color: #ef4444; }
  `}</style>
);

// --- LOGIN PAGE COMPONENT ---
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await authService.login(username, password);
      const data = res.data; // { accessToken, refreshToken, username, role } from backend

      // Save to localStorage so you can see it in DevTools → Application → Local Storage
      localStorage.setItem('authUser', JSON.stringify({
        username: data.username,
        role: data.role,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      }));

      // Role-based redirect
      if (data.role === 'ROLE_ADMIN') {
        navigate('/admin/dashboard');
      } else if (data.role === 'ROLE_EMPLOYEE') {
        navigate('/employee/dashboard');
      } else {
        navigate('/citizen/dashboard');
      }
    } catch (err) {
      setError('Login failed. Please check your username and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = () => {
    window.location.href = 'https://complaint-indol.vercel.app/admin';
  };

  const handleEmployeeLogin = () => {
    window.location.href = 'https://complaint-indol.vercel.app/employee';
  };

  return (
    <>
      <Background />
      <Styles />
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="username" className="input-label">Username</label>
              <input id="username" type="text" className="input-field"
                     value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div className="input-group">
              <label htmlFor="password" className="input-label">Password</label>
              <input id="password" type="password" className="input-field"
                     value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Signing In...' : 'Login'}
            </button>
          </form>
          {error && <p className="message error">{error}</p>}
          
          <div className="quick-login-section">
            <div className="quick-login-divider">
              <span>Or login directly as</span>
            </div>
            <div className="quick-login-buttons">
              <button 
                className="quick-login-btn admin" 
                onClick={handleAdminLogin}
                type="button"
              >
                Login as Admin
              </button>
              <button 
                className="quick-login-btn employee" 
                onClick={handleEmployeeLogin}
                type="button"
              >
                Login as Employee
              </button>
            </div>
          </div>

          <div className="auth-footer">
            <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;