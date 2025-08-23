// src/pages/employee/pages/AssignedComplaintsPage.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import complaintService from '../../services/complaintService';

const Styles = () => (
  <style>{`
    .table-wrapper { background: #1f2937; border-radius: 12px; padding: 1.5rem; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); overflow-x: auto; }
    .user-table { width: 100%; border-collapse: collapse; text-align: left; }
    .user-table th { padding: 1rem 1.5rem; font-size: 0.9rem; text-transform: uppercase; color: #9ca3af; border-bottom: 2px solid #374151; }
    .user-table td { padding: 1rem 1.5rem; border-bottom: 1px solid #374151; vertical-align: middle; }
    .user-table tbody tr:last-child td { border-bottom: none; }
    .clickable-row:hover { background-color: #374151; cursor: pointer; }
    .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; white-space: nowrap; }
    .status-pending { background-color: #f97316; } 
    .status-in_progress { background-color: #3b82f6; }
    .status-resolved { background-color: #22c55e; } 
    .status-rejected { background-color: #ef4444; }
  `}</style>
);

const AssignedComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const stored = localStorage.getItem('username') || '';
        const username = stored.toLowerCase().includes('employee') ? stored : 'employee1';
        const response = await complaintService.getMyComplaints(username);
        setComplaints(response.data || []);
      } catch (error) {
        console.error("Failed to fetch assigned complaints", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);
  

  const formatDate = (value) => {
    if (!value) return '-';
    try {
      if (typeof value === 'number') {
        // If backend accidentally sends epoch seconds
        const ms = value < 1e12 ? value * 1000 : value;
        return new Date(ms).toLocaleDateString();
      }
      const d = new Date(value);
      return isNaN(d.getTime()) ? '-' : d.toLocaleDateString();
    } catch {
      return '-';
    }
  };

  const formatStatus = (status) => (status || '').replace('_', ' ');

  return (
    <>
      <Styles />
      <div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem' }}>
          My Assigned Complaints
        </h1>
        {loading ? (
          <p>Loading complaints...</p>
        ) : (
          <div className="table-wrapper">
            <table className="user-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Category</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c) => (
                    <tr
                      key={c.id}
                      className="clickable-row"
                      onClick={() => navigate(`/employee/complaints/${c.id}`)}
                    >
                      <td>{c.id}</td>
                      <td>{c.title}</td>
                      <td>
                        <span className={`status-badge status-${c.status?.toLowerCase()}`}>
                          {formatStatus(c.status)}
                        </span>
                      </td>
                      <td>{c.category || 'N/A'}</td>
                      <td>{formatDate(c.createdAt)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', padding: '1rem' }}>
                      No complaints assigned.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AssignedComplaintsPage;
