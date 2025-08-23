import React from 'react';

const Styles = () => ( <style>{`.btn-danger { background-color: #ef4444; color: #fff; } .btn-danger:hover { background-color: #dc2626; }`}</style> );

const ConfirmDeleteDialog = ({ user, onClose, onConfirm }) => {
    if (!user) return null;

    return (
        <>
            <Styles />
            <div className="dialog-backdrop" onClick={onClose}>
                <div className="dialog" onClick={e => e.stopPropagation()}>
                    <div className="dialog-header">
                        <h2>Confirm Deletion</h2>
                        <p>Are you sure you want to delete user: <strong>{user.username}</strong>?</p>
                        <p style={{color: '#fca5a5', marginTop: '1rem'}}>This action cannot be undone.</p>
                    </div>
                    <div className="dialog-actions">
                        <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
                        <button className="btn btn-danger" onClick={() => onConfirm(user.id)}>Delete User</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConfirmDeleteDialog;