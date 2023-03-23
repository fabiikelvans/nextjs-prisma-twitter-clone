import React from 'react';
import CommentItem from "@/components/posts/CommentItem";

interface CommentFeedProps {
    comments?: Record<string, any>[];
}

function CommentFeed({ comments = [] } : CommentFeedProps) {
    return (
        <>
            {comments.map((comment) => (
                <CommentItem key={comment.id} data={comment}/>
            ))}
        </>
    );
}

export default CommentFeed;