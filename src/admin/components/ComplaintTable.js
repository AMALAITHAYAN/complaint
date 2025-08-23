import React from 'react';
import { useNavigate } from 'react-router-dom'; // <-- 1. Import useNavigate

const AssignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 18, height: 18}}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const DeleteIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: 18, height: 18}}><path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.134-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.067-2.09 1.02-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" /></svg>;

const ComplaintTable = ({ complaints, onAssign, onDelete }) => {
    const navigate = useNavigate(); // <-- 2. Initialize the navigate function

    const formatDate = (isoString) => new Date(isoString).toLocaleDateString();
    const formatStatus = (status) => (status || '').replace('_', ' ');

    const handleRowClick = (complaintId) => {
        navigate(`/admin/complaints/${complaintId}`);
    };

    return (
        <div className="table-wrapper">
            <table className="user-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Assigned To</th>
                        <th>Created At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {complaints.map(c => (
                        <tr key={c.id} className="clickable-row" onClick={() => handleRowClick(c.id)}>
                            <td>{c.id}</td>
                            <td>{c.title}</td>
                            <td><span className={`status-badge status-${c.status?.toLowerCase()}`}>{formatStatus(c.status)}</span></td>
                            <td>{c.category || 'N/A'}</td>
                            <td>{c.assignedTo || 'Unassigned'}</td>
                            <td>{formatDate(c.createdAt)}</td>
                            <td onClick={(e) => e.stopPropagation()}> {/* Prevents row click when clicking buttons */}
                                <button className="action-btn assign-btn" onClick={() => onAssign(c)}>
                                    <AssignIcon />
                                </button>
                                <button className="action-btn delete-btn" onClick={() => onDelete(c)}>
                                    <DeleteIcon />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintTable;