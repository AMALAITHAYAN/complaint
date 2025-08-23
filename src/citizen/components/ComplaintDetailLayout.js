import React, { useState, useEffect, useCallback } from 'react';
import { Outlet, NavLink, useParams, Link } from 'react-router-dom';
import complaintService from '../../services/complaintService';

const Styles = () => (
    <style>{`
        .detail-view-header { margin-bottom: 2rem; }
        .detail-view-header h1 { font-size: 2.2rem; margin: 0; color: #fff; }
        .detail-view-header p { color: #9ca3af; margin: 0.25rem 0 0; }
        .detail-tabs { display: flex; gap: 0.5rem; border-bottom: 2px solid #374151; margin-bottom: 2rem; }
        .detail-tabs a { padding: 0.8rem 1.5rem; text-decoration: none; color: #9ca3af; font-weight: 500; border-radius: 8px 8px 0 0; transition: all 0.2s; }
        .detail-tabs a.active { background-color: #1f2937; color: #fff; border: 2px solid #374151; border-bottom: 2px solid #1f2937; }
        .back-link { color: #60a5fa; text-decoration: none; margin-bottom: 1rem; display: inline-block; font-weight: 500; }
    `}</style>
);

const ComplaintDetailLayout = () => {
    const { id } = useParams();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await complaintService.getComplaintDetails(id);
            setComplaint(response.data);
        } catch (error) {
            console.error("Failed to fetch details", error);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchDetails();
    }, [fetchDetails]);

    if (loading) return <p style={{color: 'white', textAlign: 'center'}}>Loading complaint...</p>;
    if (!complaint) return <p style={{color: 'white', textAlign: 'center'}}>Complaint not found.</p>;

    return (
        <>
            <Styles />
            <Link to="/citizen/complaints" className="back-link">&larr; Back to My Complaints</Link>
            <div className="detail-view-header">
                <h1>{complaint.details.title}</h1>
                <p>Complaint #{complaint.details.id}</p>
            </div>
            <nav className="detail-tabs">
                <NavLink to={`/citizen/complaints/${id}`} end>Details</NavLink>
                <NavLink to={`/citizen/complaints/${id}/comments`}>Comments</NavLink>
                <NavLink to={`/citizen/complaints/${id}/history`}>History</NavLink>
            </nav>
            <div>
                <Outlet context={{ complaint, fetchDetails }} />
            </div>
        </>
    );
};

export default ComplaintDetailLayout;
