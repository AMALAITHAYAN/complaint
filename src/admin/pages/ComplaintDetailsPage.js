import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import complaintService from '../../services/complaintService';
import InlineStatusEdit from '../components/InlineStatusEdit';

// NOTE: This uses the same Styles component as the Employee details page
const Styles = () => (
    <style>{`
        body { background-color: #111827; font-family: sans-serif; color: #fff; }
        .details-container { max-width: 1200px; margin: 40px auto; padding: 2rem; }
        .back-link { color: #3b82f6; text-decoration: none; margin-bottom: 2rem; display: inline-block; }
        .details-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 2rem; align-items: start; }
        .details-card, .history-card { background: #1f2937; padding: 2rem; border-radius: 12px; }
        .details-header { border-bottom: 1px solid #374151; padding-bottom: 1rem; margin-bottom: 1.5rem; }
        .details-header h1 { font-size: 2rem; margin: 0; }
        .details-header p { color: #9ca3af; margin: 0.25rem 0 0; }
        .detail-item { margin-bottom: 1rem; }
        .detail-item strong { color: #9ca3af; display: block; }
        .detail-item span { font-size: 1.1rem; }
        .status-display, .status-edit { display: flex; align-items: center; gap: 1rem; }
        .edit-status-btn { background: none; border: none; color: #3b82f6; cursor: pointer; text-decoration: underline; }
        .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 600; text-transform: capitalize; }
        .status-pending { background-color: #f97316; } .status-in_progress { background-color: #3b82f6; }
        .status-resolved { background-color: #22c55e; } .status-rejected { background-color: #ef4444; }
        .filter-select { padding: 0.5rem; background: #374151; border: 1px solid #4b5563; border-radius: 8px; color: #fff; }
        .btn { padding: 0.5rem 1rem; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
        .btn-secondary { background-color: #4b5563; color: #fff; } .btn-primary { background-color: #3b82f6; color: #fff; }
        /* --- STYLES FOR HISTORY LIST --- */
        .history-list { list-style: none; padding: 0; margin: 0; }
        .history-item { padding: 1rem 0; border-bottom: 1px solid #374151; }
        .history-item:last-child { border-bottom: none; }
        .history-item p { margin: 0; font-size: 1rem; color: #d1d5db; }
        .history-item-meta { font-size: 0.8rem; color: #9ca3af; margin-top: 0.25rem; }
    `}</style>
);


const AdminComplaintDetailsPage = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await complaintService.getComplaintDetails(id);
            setComplaint(response.data.details);
            setHistory(response.data.history);
        } catch (error) {
            console.error("Failed to fetch details", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    if (loading) return <p>Loading complaint details...</p>;
    if (!complaint) return <p>Complaint not found.</p>;

    return (
        <>
            <Styles />
            <div className="details-container">
                <Link to="/admin/complaints" className="back-link">&larr; Back to All Complaints</Link>
                <div className="details-grid">
                    <div className="details-card">
                        <div className="details-header">
                            <h1>{complaint.title}</h1>
                            <p>Submitted by: {complaint.submittedBy} on {new Date(complaint.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="detail-item">
                            <strong>Status</strong>
                            <InlineStatusEdit complaint={complaint} onStatusUpdate={fetchDetails} />
                        </div>
                        {/* Add more details here */}
                    </div>
                    <div className="history-card">
                        <h2>History</h2>
                        {/* --- ADDED HISTORY LIST --- */}
                         <ul className="history-list">
                            {history.length > 0 ? history.map(item => (
                                <li key={item.id} className="history-item">
                                    <p>Status set to <strong>{item.status.replace('_', ' ')}</strong></p>
                                    <p className="history-item-meta">
                                        by {item.changedBy} ({item.changedRole.replace('ROLE_', '')}) on {new Date(item.changedAt).toLocaleString()}
                                    </p>
                                </li>
                            )) : <p>No history found.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminComplaintDetailsPage;