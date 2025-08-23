import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../services/authService';

// --- DYNAMIC BACKGROUND ---
const Background = () => (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, backgroundColor: '#111827', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '200%', height: '200%', background: 'radial-gradient(circle, rgba(29, 78, 216, 0.3) 0%, rgba(29, 78, 216, 0) 60%)', animation: 'spin 20s linear infinite' }}></div>
        <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
);

// --- STYLES (Same as LoginPage) ---
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
      .submit-btn { width: 100%; padding: 1rem; border-radius: 10px; border: none; background-color: #3b82f6; color: #fff; font-size: 1.1rem; font-weight: 600; cursor: pointer; transition: background-color 0.3s ease; margin-top: 1rem;}
      .submit-btn:hover { background-color: #2563eb; }
      .auth-footer { text-align: center; margin-top: 1.5rem; }
      .auth-footer a { color: #3b82f6; text-decoration: none; font-weight: 500; }
      .auth-footer a:hover { text-decoration: underline; }
      .message { text-align: center; padding: 1rem; margin-top: 1.5rem; border-radius: 8px; font-weight: 500; }
      .message.error { background-color: rgba(239, 68, 68, 0.2); color: #ef4444; }
      .message.success { background-color: rgba(34, 197, 94, 0.2); color: #22c55e; }
    `}</style>
  );

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [successful, setSuccessful] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setLoading(true); // Set loading true
        try {
            const response = await authService.register(username, email, password);
            setMessage(response.data.message);
            setSuccessful(true);
        } catch (error) {
            setMessage((error.response?.data?.message) || 'Registration Failed');
            setSuccessful(false);
        } finally {
            setLoading(false); // Set loading false
        }
    };

    return (
        <>
            <Background />
            <Styles />
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-header">
                        <h1>Create an Account</h1>
                        <p>Join us to manage your complaints</p>
                    </div>
                    {successful ? (
                        <p className="message success">{message}</p>
                    ) : (
                        <form onSubmit={handleRegister}>
                            <div className="input-group">
                                <label className="input-label" htmlFor="username">Username</label>
                                <input id="username" type="text" className="input-field" value={username} onChange={(e) => setUsername(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label" htmlFor="email">Email Address</label>
                                <input id="email" type="email" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} required />
                            </div>
                            <div className="input-group">
                                <label className="input-label" htmlFor="password">Password</label>
                                <input id="password" type="password" className="input-field" value={password} onChange={(e) => setPassword(e.target.value)} required />
                            </div>
                            <button type="submit" className="submit-btn" disabled={loading}>
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </button>
                        </form>
                    )}
                    {message && !successful && <p className="message error">{message}</p>}
                    <div className="auth-footer">
                        <p>Already have an account? <Link to="/login">Sign In</Link></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;