// src/pages/employee/components/CommentComposer.js
import React, { useState } from 'react';

const CommentComposer = ({ onCommentSubmit }) => {
  const [body, setBody] = useState('');
  const [internal, setInternal] = useState(true); // default as internal note

  const handleSubmit = () => {
    if (body.trim()) {
      onCommentSubmit({ body, internal });
      setBody('');
    }
  };

  return (
    <div className="comment-composer">
      <h4>{internal ? 'Add Internal Note' : 'Add Comment'}</h4>

      <textarea
        className="comment-textarea"
        rows="4"
        placeholder="Type your note here..."
        value={body}
        onChange={(e) => setBody(e.target.value)}
      ></textarea>

      <div style={{ marginBottom: '0.75rem' }}>
        <label style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
          <input
            type="checkbox"
            checked={internal}
            onChange={(e) => setInternal(e.target.checked)}
            style={{ marginRight: '0.5rem' }}
          />
          Mark as internal note
        </label>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit}>
        {internal ? 'Post Note' : 'Post Comment'}
      </button>
    </div>
  );
};

export default CommentComposer;
