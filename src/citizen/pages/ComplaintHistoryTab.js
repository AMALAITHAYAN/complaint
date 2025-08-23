import React from 'react';
import { useOutletContext } from 'react-router-dom';

const Styles = () => (
    <style>{`
        .history-card {
            background: #1f2937;
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #374151;
        }
        .history-card h2 {
            margin-top: 0;
            font-size: 1.25rem;
            border-bottom: 1px solid #374151;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
        }
        .history-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .history-item {
            padding: 1rem 0;
            border-bottom: 1px solid #374151;
        }
        .history-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        .history-item:first-child {
            padding-top: 0;
        }
        .history-item p {
            margin: 0;
            font-size: 0.9rem;
            color: #d1d5db;
        }
        .history-item-meta {
            font-size: 0.8rem;
            color: #9ca3af;
            margin-top: 0.25rem;
        }
    `}</style>
);

const ComplaintHistoryTab = () => {
    const { complaint } = useOutletContext();
    const history = complaint.history || [];

    return (
        <>
            <Styles />
            <div className="history-card">
                <h2>History</h2>
                <ul className="history-list">
                    {history.length > 0 ? history.map(item => (
                        <li key={item.id} className="history-item">
                            <p>Status set to <strong>{item.status.replace('_', ' ')}</strong></p>
                            <p className="history-item-meta">
                                on {new Date(item.changedAt).toLocaleString()}
                            </p>
                        </li>
                    )) : <p>No history found.</p>}
                </ul>
            </div>
        </>
    );
};

export default ComplaintHistoryTab;
