// src/pages/employee/pages/ComplaintDetailsPage.js
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import complaintService from '../../services/complaintService';
import StatusActions from '../components/StatusActions';
import CommentsTab from '../components/CommentsTab';
import CommentComposer from '../components/CommentComposer';
import toast from 'react-hot-toast';

const Styles = () => (
  <style>{`
    body { font-family: 'Poppins', sans-serif; }
    .details-container { max-width: 1200px; margin: 0 auto; padding: 2rem; }
    .back-link { 
      color: #60a5fa; text-decoration: none; margin-bottom: 2rem; 
      display: inline-block; font-weight: 500; transition: color 0.2s;
    }
    .back-link:hover { color: #93c5fd; }

    .details-grid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 2rem;
      align-items: start;
    }
    .main-column, .side-column { display: flex; flex-direction: column; gap: 2rem; }

    .details-card, .history-card, .comments-card, .actions-card {
      background: #1f2937;
      padding: 2rem;
      border-radius: 12px;
      border: 1px solid #374151;
    }

    .card-header h1 { font-size: 1.8rem; margin: 0 0 0.5rem 0; color: #fff; }
    .card-header p { color: #9ca3af; margin: 0; font-size: 0.9rem; }
    .detail-item { margin-bottom: 1.5rem; }
    .detail-item:last-child { margin-bottom: 0; }
    .detail-item strong { 
      color: #9ca3af; display: block; margin-bottom: 0.5rem; 
      font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.5px;
    }
    .detail-item p { font-size: 1rem; color: #d1d5db; margin: 0; line-height: 1.6; }

    .history-card h2, .comments-card h3 { 
      margin-top: 0; font-size: 1.25rem; border-bottom: 1px solid #374151; 
      padding-bottom: 1rem; margin-bottom: 1rem; 
    }
    .history-list, .comments-list { list-style: none; padding: 0; margin: 0; }
    .history-item, .comment-item { padding: 1rem 0; border-bottom: 1px solid #374151; }
    .history-item:first-child, .comment-item:first-child { padding-top: 0; }
    .history-item:last-child, .comment-item:last-child { border-bottom: none; padding-bottom: 0; }
    .history-item p, .comment-body { margin: 0; font-size: 0.9rem; color: #d1d5db; }
    .history-item-meta, .comment-header { font-size: 0.8rem; color: #9ca3af; margin-top: 0.25rem; }

    .comment-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
    .comment-author { font-weight: bold; color: #fff; }
    .internal-badge { background-color: #f59e0b; color: #111827; padding: 0.2rem 0.5rem; border-radius: 10px; font-size: 0.7rem; font-weight: bold; }
    .comment-composer { margin-top: 1.5rem; border-top: 1px solid #374151; padding-top: 1.5rem; }
    .comment-textarea { width: 100%; padding: 0.75rem; background: #374151; border: 1px solid #4b5563; border-radius: 8px; color: #fff; font-size: 1rem; margin-bottom: 0.5rem;}
    .status-badge { padding: 0.3rem 0.8rem; border-radius: 20px; font-weight: 600; text-transform: capitalize; }
    .status-pending { background-color: #f97316; } 
    .status-in_progress { background-color: #3b82f6; }
    .status-resolved { background-color: #22c55e; } 
    .status-rejected { background-color: #ef4444; }
  `}</style>
);

const EmployeeComplaintDetailsPage = () => {
  const { id } = useParams();
  const [complaint, setComplaint] = useState(null);
  const [history, setHistory] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDetails = useCallback(async () => {
    setLoading(true);
    try {
      const res = await complaintService.getComplaintDetails(id);
      const data = res.data;
      setComplaint(data.details);
      setHistory(data.history || []);
      setComments(data.comments || []);
    } catch (err) {
      console.error('Error loading complaint:', err);
      toast.error('Failed to load complaint details');
      setComplaint(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchDetails();
  }, [fetchDetails]);

  const handleCommentSubmit = async ({ body, internal }) => {
    try {
      const stored = localStorage.getItem('username') || '';
      const username = stored.toLowerCase().includes('employee') ? stored : 'employee1';
  
      await complaintService.addComment(id, body, username, internal);
      toast.success('Comment added');
      fetchDetails();
    } catch (err) {
      console.error('Error adding comment:', err);
      toast.error('Failed to add comment');
    }
  };
  

  if (loading) return <p style={{ color: 'white', textAlign: 'center' }}>Loading complaint details...</p>;
  if (!complaint) return <p style={{ color: 'white', textAlign: 'center' }}>Complaint not found.</p>;

  return (
    <>
      <Styles />
      <div className="details-container">
        <Link to="/employee/dashboard" className="back-link">&larr; Back to My Complaints</Link>
        <div className="details-grid">
          <div className="main-column">
            <div className="details-card">
              <div className="card-header">
                <h1>{complaint.title}</h1>
                <p>
                  Submitted by: {complaint.submittedBy || '-'} on{" "}
                  {complaint.createdAt ? new Date(complaint.createdAt).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>

            <div className="details-card">
              <div className="detail-item">
                <strong>Description</strong>
                <p>{complaint.description}</p>
              </div>
            </div>

            <div className="comments-card">
              <CommentsTab comments={comments} />
              <CommentComposer onCommentSubmit={handleCommentSubmit} />
            </div>
          </div>

          <div className="side-column">
            <div className="actions-card">
              <div className="detail-item">
                <strong>Status</strong>
                <p>
                  <span className={`status-badge status-${complaint.status?.toLowerCase()}`}>
                    {complaint.status?.replace('_', ' ')}
                  </span>
                </p>
              </div>
              <hr style={{ border: '1px solid #374151', margin: '1.5rem 0' }} />
              <StatusActions complaint={complaint} onUpdate={fetchDetails} />
            </div>

            <div className="history-card">
              <h2>History</h2>
              <ul className="history-list">
                {history.length > 0 ? history.map(item => (
                  <li key={item.id} className="history-item">
                    <p>Status set to <strong>{item.status.replace('_', ' ')}</strong></p>
                    <p className="history-item-meta">
                      by {item.changedBy} on {new Date(item.changedAt).toLocaleString()}
                    </p>
                  </li>
                )) : <p>No history found.</p>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeComplaintDetailsPage;
