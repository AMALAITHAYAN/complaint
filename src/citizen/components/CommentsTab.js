import React from 'react';

// --- SVG Icon ---
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" style={{width: '24px', height: '24px'}}><path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const CommentsTab = ({ comments }) => {
    return (
        <div className="comments-tab">
            <h3>Comments & Notes</h3>
            <ul className="comments-list">
                {comments.length > 0 ? comments.map(comment => (
                    <li key={comment.id} className={`comment-item ${comment.internal ? 'internal' : 'public'}`}>
                        <div className="comment-avatar">
                            <UserIcon />
                        </div>
                        <div className="comment-content">
                            <div className="comment-header">
                                <span className="comment-author">{comment.authorUsername}</span>
                                <span className="comment-meta">
                                    {comment.internal && <span className="internal-badge">Internal</span>}
                                    {new Date(comment.createdAt).toLocaleString()}
                                </span>
                            </div>
                            <p className="comment-body">{comment.body}</p>
                        </div>
                    </li>
                )) : <p>No comments yet.</p>}
            </ul>
        </div>
    );
};

export default CommentsTab;
