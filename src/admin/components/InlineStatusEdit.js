import React, { useState } from 'react';
import complaintService from '../../services/complaintService';

const InlineStatusEdit = ({ complaint, onStatusUpdate }) => {
    const [status, setStatus] = useState(complaint.status);
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = async () => {
        try {
            // We'll simulate the update as "admin1" for now
            await complaintService.updateComplaintStatus(complaint.id, status, 'admin1');
            setIsEditing(false);
            onStatusUpdate(); // Tell the parent page to refresh
        } catch (error) {
            console.error("Failed to update status", error);
        }
    };

    if (!isEditing) {
        return (
            <div className="status-display">
                <span className={`status-badge status-${complaint.status?.toLowerCase()}`}>{complaint.status.replace('_', ' ')}</span>
                <button className="edit-status-btn" onClick={() => setIsEditing(true)}>Change</button>
            </div>
        );
    }

    return (
        <div className="status-edit">
            <select className="filter-select" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="PENDING">Pending</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="RESOLVED">Resolved</option>
                <option value="REJECTED">Rejected</option>
            </select>
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
    );
};

export default InlineStatusEdit;