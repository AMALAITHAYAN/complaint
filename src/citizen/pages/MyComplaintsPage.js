// src/pages/citizen/MyComplaintsPage.jsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
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
    .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-size: 0.8rem; font-weight: 600; text-transform: capitalize; white-space: nowrap; color:#111827; }
    .status-pending { background-color: #f97316; }
    .status-in_progress { background-color: #3b82f6; }
    .status-resolved { background-color: #22c55e; }
    .status-rejected { background-color: #ef4444; }
    .empty { color:#9ca3af; margin-top:1rem; }
    .toolbar { display:flex; gap:.75rem; align-items:center; margin-bottom:1rem; }
    .pill { background:#111827; color:#9ca3af; border:1px solid #374151; border-radius:999px; padding:.25rem .75rem; font-size:.85rem; }
    .btn { background:#3b82f6; color:#fff; border:none; border-radius:8px; padding:.5rem 1rem; cursor:pointer; }
    .btn:disabled { background:#555; cursor:not-allowed; }
  `}</style>
);

// Get username from storage (set during submit/login)
function useUsername() {
  return useMemo(() => {
    return (
      localStorage.getItem('username') ||
      sessionStorage.getItem('username') ||
      ''
    );
  }, []);
}

const MyComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();
  const username = useUsername();

  const fetchComplaints = useCallback(async () => {
    if (!username) {
      setErrMsg('⚠️ No username found. Please log in or submit a complaint to continue.');
      setComplaints([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setErrMsg('');
    try {
      // Fetch complaints by username (backend filters by username)
      const res = await complaintService.getMyComplaints({ username });

      // Support multiple API response shapes
      const raw = res?.data;
      const list = Array.isArray(raw)
        ? raw
        : Array.isArray(raw?.items)
        ? raw.items
        : Array.isArray(raw?.content)
        ? raw.content
        : [];

      setComplaints(list);
    } catch (err) {
      console.error('Failed to fetch complaints:', err?.response?.data || err);
      setErrMsg(
        err?.response?.data?.message ||
          err?.message ||
          'Failed to fetch complaints'
      );
      setComplaints([]);
    } finally {
      setLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchComplaints();
  }, [fetchComplaints]);

  const formatDate = (v) => {
    if (!v) return '—';
    const d = new Date(v);
    return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString();
  };

  const formatStatus = (status) => (status || '').replace('_', ' ');

  return (
    <>
      <Styles />
      <div>
        <div className="toolbar">
          <span className="pill">Viewing as: {username || 'unknown user'}</span>
          <button className="btn" onClick={fetchComplaints} disabled={loading}>
            {loading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '2rem' }}>
          My Submitted Complaints
        </h1>

        {errMsg && <p className="empty">{errMsg}</p>}

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
                  <th>Assigned To</th>
                  <th>Created At</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="empty">
                      No complaints found for your account.
                    </td>
                  </tr>
                ) : (
                  complaints.map((c) => (
                    <tr
                      key={c.id}
                      className="clickable-row"
                      onClick={() => navigate(`/citizen/complaints/${c.id}`)}
                    >
                      <td>{c.id}</td>
                      <td>{c.title}</td>
                      <td>
                        <span
                          className={`status-badge status-${(c.status || '')
                            .toLowerCase()
                            .replace(' ', '_')}`}
                        >
                          {formatStatus(c.status)}
                        </span>
                      </td>
                      <td>{c.category || 'N/A'}</td>
                      <td>{c.assignedTo || 'Unassigned'}</td>
                      <td>{formatDate(c.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default MyComplaintsPage;
