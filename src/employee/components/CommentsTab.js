// src/pages/employee/components/CommentsTab.js
import React from 'react';

const CommentsTab = ({ comments }) => {
  const formatDate = (v) => {
    if (!v) return '-';
    try {
      if (typeof v === 'number') {
        const ms = v < 1e12 ? v * 1000 : v; // seconds → ms
        return new Date(ms).toLocaleString();
      }
      const d = new Date(v);
      return isNaN(d.getTime()) ? '-' : d.toLocaleString();
    } catch {
      return '-';
    }
  };

  return (
    <div className="comments-tab">
      <h3>Comments & Notes</h3>
      <ul className="comments-list">
        {comments && comments.length > 0 ? (
          comments.map((comment) => (
            <li
              key={comment.id}
              className={`comment-item ${comment.internal ? 'internal' : ''}`}
            >
              <div className="comment-header">
                <span className="comment-author">
                  {comment.authorUsername} ({comment.authorRole || 'USER'})
                </span>
                <span className="comment-meta">
                  {comment.internal && (
                    <span className="internal-badge" style={{ marginRight: '0.5rem' }}>
                      Internal
                    </span>
                  )}
                  {formatDate(comment.createdAt)}
                </span>
              </div>
              <p className="comment-body">{comment.body}</p>
            </li>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </ul>
    </div>
  );
};

export default CommentsTab;
