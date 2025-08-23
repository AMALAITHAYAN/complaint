// src/pages/employee/components/StatusActions.js
import React from 'react';
import complaintService from '../../services/complaintService';
import toast from 'react-hot-toast';

const Styles = () => (
  <style>{`
    .actions-container { display: flex; flex-direction: column; gap: 1rem; }
    .actions-container h3 { margin-top: 0; color: #d1d5db; }
    .actions-buttons { display: flex; gap: 1rem; flex-wrap: wrap; }
    .btn { padding: 0.6rem 1.2rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
    .btn-primary { background-color: #3b82f6; color: #fff; }
    .btn-success { background-color: #22c55e; color: #fff; }
    .btn-danger { background-color: #ef4444; color: #fff; }
  `}</style>
);

const StatusActions = ({ complaint, onUpdate }) => {
    const handleUpdate = async (newStatus, note = '') => {
        try {
          // Force an EMPLOYEE identity for this action
          const username = 'employee1';
      
          await complaintService.updateComplaintStatus(
            complaint.id,
            newStatus,
            username,
            note
          );
          toast.success(`Status updated to ${newStatus.replace('_', ' ')}`);
          onUpdate();
        } catch (error) {
          console.error('Update failed:', error?.response?.data || error);
          const msg = error?.response?.data?.message || 'Failed to update status.';
          toast.error(msg);
        }
      };
      
      

  return (
    <>
      <Styles />
      <div className="actions-container">
        <h3>Update Status</h3>
        <div className="actions-buttons">
          {complaint.status === 'PENDING' && (
            <button
              className="btn btn-primary"
              onClick={() => handleUpdate('IN_PROGRESS', 'Work started')}
            >
              Start Progress
            </button>
          )}
          {complaint.status === 'IN_PROGRESS' && (
            <button
              className="btn btn-success"
              onClick={() => handleUpdate('RESOLVED', 'Issue resolved')}
            >
              Mark as Resolved
            </button>
          )}
          {complaint.status === 'IN_PROGRESS' && (
            <button
              className="btn btn-danger"
              onClick={() => handleUpdate('REJECTED', 'Cannot resolve')}
            >
              Reject
            </button>
          )}
        </div>
        {complaint.status === 'RESOLVED' && <p>This complaint has been resolved.</p>}
        {complaint.status === 'REJECTED' && <p>This complaint has been rejected.</p>}
      </div>
    </>
  );
};

export default StatusActions;
