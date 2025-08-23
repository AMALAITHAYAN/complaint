import React, { useState } from 'react';

// --- STYLES FOR THE MODAL ---
const Styles = () => (
    <style>{`
        .dialog-backdrop {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background-color: rgba(0, 0, 0, 0.7); display: flex;
            align-items: center; justify-content: center; z-index: 1000;
        }
        .dialog {
            background: #1f2937; padding: 2rem; border-radius: 12px;
            width: 100%; max-width: 450px; color: #fff;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .dialog-header { margin-bottom: 1.5rem; }
        .dialog-header h2 { margin: 0; font-size: 1.5rem; }
        .dialog-header p { margin: 0.25rem 0 0; color: #9ca3af; }
        .form-group { margin-bottom: 1rem; }
        .form-label { display: block; margin-bottom: 0.5rem; color: #d1d5db; font-weight: 500; }
        .form-control {
            width: 100%; padding: 0.75rem 1rem; background: #374151;
            border: 1px solid #4b5563; border-radius: 8px; color: #fff; font-size: 1rem;
        }
        .dialog-actions { margin-top: 2rem; display: flex; justify-content: flex-end; gap: 1rem; }
        .btn { padding: 0.6rem 1.2rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: background-color 0.2s; }
        .btn-secondary { background-color: #4b5563; color: #fff; }
        .btn-secondary:hover { background-color: #6b7280; }
        .btn-primary { background-color: #3b82f6; color: #fff; }
        .btn-primary:hover { background-color: #2563eb; }
    `}</style>
);

const UserCreateDialog = ({ isOpen, onClose, onSave }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('ROLE_CITIZEN'); // Default role

    if (!isOpen) return null;

    const handleSave = () => {
        const userData = { username, email, password, role };
        onSave(userData);
    };

    const handleClose = () => {
        // Reset form on close
        setUsername('');
        setEmail('');
        setPassword('');
        setRole('ROLE_CITIZEN');
        onClose();
    }

    return (
        <>
            <Styles />
            <div className="dialog-backdrop" onClick={handleClose}>
                <div className="dialog" onClick={e => e.stopPropagation()}>
                    <div className="dialog-header">
                        <h2>Create New User</h2>
                        <p>Enter the details for the new user account.</p>
                    </div>
                    <div className="dialog-body">
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">Username</label>
                            <input id="username" type="text" className="form-control" value={username} onChange={e => setUsername(e.target.value)} />
                        </div>
                         <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <input id="email" type="email" className="form-control" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">Password</label>
                            <input id="password" type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} />
                        </div>
                        <div className="form-group">
                            <label className="form-label" htmlFor="role">Role</label>
                            <select id="role" className="form-control" value={role} onChange={e => setRole(e.target.value)}>
                                <option value="ROLE_CITIZEN">Citizen</option>
                                <option value="ROLE_EMPLOYEE">Employee</option>
                                <option value="ROLE_ADMIN">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="dialog-actions">
                        <button className="btn btn-secondary" onClick={handleClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={handleSave}>Create User</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCreateDialog;