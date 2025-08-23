import React from 'react';

// This component can reuse the styles from our other dialogs
const ConfirmComplaintDeleteDialog = ({ complaint, onClose, onConfirm }) => {
    if (!complaint) return null;

    return (
        <div className="dialog-backdrop" onClick={onClose}>
            <div className="dialog" onClick={e => e.stopPropagation()}>
                <div className="dialog-header">
                    <h2>Confirm Deletion</h2>
                    <p>Are you sure you want to delete this complaint?</p>
                    <p style={{color: '#d1d5db', marginTop: '1rem'}}>
                        <strong>#{complaint.id} - {complaint.title}</strong>
                    </p>
                </div>
                <div className="dialog-actions">
                    <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                    <button className="btn btn-danger" onClick={() => onConfirm(complaint.id)}>Delete</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmComplaintDeleteDialog;