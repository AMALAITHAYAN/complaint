import React, { useState } from 'react';

// --- SVG Icon ---
const SendIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '18px', height: '18px'}}><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" /></svg>;

const CommentComposer = ({ onCommentSubmit, title = "Add a Comment" }) => {
    const [body, setBody] = useState('');

    const handleSubmit = () => {
        if (body.trim()) {
            onCommentSubmit(body);
            setBody('');
        }
    };

    return (
        <div className="comment-composer">
            <h4>{title}</h4>
            <textarea
                className="comment-textarea"
                rows="4"
                placeholder="Type your message here..."
                value={body}
                onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button className="btn btn-primary" onClick={handleSubmit}>
                <span>Post Comment</span>
                <SendIcon />
            </button>
        </div>
    );
};

export default CommentComposer;
