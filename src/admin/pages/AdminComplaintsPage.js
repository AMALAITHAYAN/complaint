import React, { useState, useEffect, useCallback } from 'react';
import toast from 'react-hot-toast'; // <-- 1. Import toast
import adminComplaintService from '../services/adminComplaintService';
import ComplaintTable from '../components/ComplaintTable';
import ComplaintFilters from '../components/ComplaintFilters';
import AssignDialog from '../components/AssignDialog';
import ConfirmComplaintDeleteDialog from '../components/ConfirmComplaintDeleteDialog'; // <-- 2. Import new component

const Styles = () => (
    <style>{`
        /* All of your existing styles are great, just adding one for the delete button */
        .admin-container { max-width: 1200px; margin: 40px auto; padding: 2rem; color: #fff; }
        .admin-header h1 { font-size: 2.5rem; font-weight: 700; margin-bottom: 2rem; }
        .table-wrapper { background: #1f2937; border-radius: 12px; padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); overflow-x: auto; }
        .user-table { width: 100%; border-collapse: collapse; text-align: left; }
        .user-table th { padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: uppercase; color: #9ca3af; border-bottom: 2px solid #374151; }
        .user-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #374151; vertical-align: middle; }
        .user-table tbody tr:last-child td { border-bottom: none; }
        .action-btn { background: none; border: none; cursor: pointer; padding: 0.5rem; margin-right: 0.5rem; color: #9ca3af; transition: color 0.2s; }
        .action-btn:hover { color: #fff; }
        .delete-btn:hover { color: #ef4444; }
        .filters-container { display: flex; gap: 1rem; margin-bottom: 2rem; }
        .filter-select { padding: 0.75rem 1rem; background: #374151; border: 1px solid #4b5563; border-radius: 8px; color: #fff; font-size: 1rem; font-family: inherit; }
        .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; white-space: nowrap; }
        .status-pending { background-color: #f97316; } .status-in_progress { background-color: #3b82f6; }
        .status-resolved { background-color: #22c55e; } .status-rejected { background-color: #ef4444; }
        .assign-btn:hover { color: #22c55e; }
        .btn-danger { background-color: #ef4444; color: #fff; } /* <-- Added for delete modal */
        .btn-danger:hover { background-color: #dc2626; }
    `}</style>
);

const AdminComplaintsPage = () => {
    const [complaints, setComplaints] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(true);
    const [assigningComplaint, setAssigningComplaint] = useState(null);
    const [deletingComplaint, setDeletingComplaint] = useState(null); // <-- 3. Add state for delete modal

    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            const response = await adminComplaintService.searchComplaints(filters);
            setComplaints(response.data);
        } catch (error) {
            console.error("Failed to fetch complaints", error);
        } finally {
            setLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    const handleFilterChange = (newFilter) => {
        const key = Object.keys(newFilter)[0];
        const value = newFilter[key];
        setFilters(prev => {
            const updated = { ...prev };
            if (value === '') {
                delete updated[key];
            } else {
                updated[key] = value;
            }
            return updated;
        });
    };

    const handleAssignSave = async (complaintId, employeeUsername) => {
        try {
            await adminComplaintService.assignComplaint(complaintId, employeeUsername);
            setAssigningComplaint(null);
            fetchComplaints();
            toast.success('Complaint assigned successfully!'); // <-- 4. Add success toast
        } catch (error) {
            console.error("Failed to assign complaint", error);
            toast.error('Failed to assign complaint.');
        }
    };
    
    // --- 5. New handler for confirming deletion ---
    const handleConfirmDelete = async (complaintId) => {
        try {
            await adminComplaintService.deleteComplaint(complaintId);
            setDeletingComplaint(null);
            fetchComplaints();
            toast.success('Complaint deleted successfully!');
        } catch (error) {
            console.error("Failed to delete complaint", error);
            toast.error('Failed to delete complaint.');
        }
    };

    return (
        <>
            <Styles />
            <div className="admin-container">
                <div className="admin-header">
                    <h1>Complaint Management</h1>
                </div>
                <ComplaintFilters onFilterChange={handleFilterChange} />
                {loading ? <p>Loading complaints...</p> : (
                    <ComplaintTable 
                        complaints={complaints}
                        onAssign={setAssigningComplaint}
                        onDelete={setDeletingComplaint} // <-- 6. Changed from alert to open modal
                    />
                )}
            </div>
            <AssignDialog 
                complaint={assigningComplaint}
                onClose={() => setAssigningComplaint(null)}
                onSave={handleAssignSave}
            />
            {/* --- 7. Render the new delete confirmation modal --- */}
            <ConfirmComplaintDeleteDialog
                complaint={deletingComplaint}
                onClose={() => setDeletingComplaint(null)}
                onConfirm={handleConfirmDelete}
            />
        </>
    );
};

export default AdminComplaintsPage;