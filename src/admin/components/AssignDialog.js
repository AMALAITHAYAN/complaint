import React, { useState, useEffect } from 'react';
import adminUserService from '../services/adminUserService';

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
        .btn-primary { background-color: #22c55e; color: #fff; } /* Green for assign */
        .btn-primary:hover { background-color: #16a34a; }
    `}</style>
);

const AssignDialog = ({ complaint, onClose, onSave }) => {
    const [employees, setEmployees] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState('');

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await adminUserService.getAllUsers();
                const employeeUsers = response.data.filter(u => u.role === 'ROLE_EMPLOYEE');
                setEmployees(employeeUsers);
                if (employeeUsers.length > 0) {
                    setSelectedEmployee(employeeUsers[0].username);
                }
            } catch (error) {
                console.error("Failed to fetch employees", error);
            }
        };
        if (complaint) {
            fetchEmployees();
        }
    }, [complaint]);

    if (!complaint) return null;

    return (
        <>
            <Styles />
            <div className="dialog-backdrop" onClick={onClose}>
                <div className="dialog" onClick={e => e.stopPropagation()}>
                    <div className="dialog-header">
                        <h2>Assign Complaint</h2>
                        <p>Assigning complaint: <strong>#{complaint.id} - {complaint.title}</strong></p>
                    </div>
                    <div className="dialog-body">
                        <div className="form-group">
                            <label className="form-label" htmlFor="employee">Select Employee</label>
                            <select id="employee" className="form-control" value={selectedEmployee} onChange={e => setSelectedEmployee(e.target.value)}>
                                {employees.length === 0 && <option>No employees found</option>}
                                {employees.map(emp => (
                                    <option key={emp.id} value={emp.username}>{emp.username}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="dialog-actions">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => onSave(complaint.id, selectedEmployee)}>Assign</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AssignDialog;