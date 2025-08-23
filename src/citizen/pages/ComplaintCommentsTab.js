import React from 'react';
import { useOutletContext } from 'react-router-dom';
import CommentsTab from '../../employee/components/CommentsTab';
import CommentComposer from '../../employee/components/CommentComposer';
import toast from 'react-hot-toast';
import complaintService from '../../services/complaintService';

const Styles = () => (
    <style>{`
        .comments-card {
            background: #1f2937;
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid #374151;
        }
        .comments-card h3 {
            margin-top: 0;
            font-size: 1.25rem;
            border-bottom: 1px solid #374151;
            padding-bottom: 1rem;
            margin-bottom: 1rem;
        }
        .comments-list {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        .comment-item {
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            background-color: #374151; /* Default for public comments */
        }
        .comment-item:last-child {
            margin-bottom: 0;
        }
        .comment-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 0.5rem;
        }
        .comment-author {
            font-weight: bold;
            color: #fff;
        }
        .comment-meta {
            font-size: 0.8rem;
            color: #9ca3af;
        }
        .comment-body {
            margin: 0;
            color: #d1d5db;
            line-height: 1.6;
        }
        .comment-composer {
            margin-top: 1.5rem;
            border-top: 1px solid #374151;
            padding-top: 1.5rem;
        }
        .comment-composer h4 {
            margin-top: 0;
            margin-bottom: 1rem;
        }
        .comment-textarea {
            width: 100%;
            padding: 0.75rem;
            background: #374151;
            border: 1px solid #4b5563;
            border-radius: 8px;
            color: #fff;
            font-size: 1rem;
            margin-bottom: 1rem;
        }
        .btn-primary {
            background-color: #3b82f6;
            color: #fff;
            padding: 0.6rem 1.2rem;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-weight: 600;
        }
    `}</style>
);

const CitizenComplaintCommentsTab = () => {
    const { complaint, fetchDetails } = useOutletContext();

    const handleCommentSubmit = async (commentBody) => {
        try {
            await complaintService.addComment(complaint.details.id, commentBody, 'citizen1');
            toast.success("Comment added successfully!");
            fetchDetails();
        } catch (error) {
            toast.error("Failed to add comment.");
        }
    };

    return (
        <>
            <Styles />
            <div className="comments-card">
                <CommentsTab comments={(complaint.comments || []).filter(c => !c.internal)} />
                <CommentComposer 
                    onCommentSubmit={handleCommentSubmit} 
                    title="Add a Public Comment" 
                />
            </div>
        </>
    );
};

export default CitizenComplaintCommentsTab;
