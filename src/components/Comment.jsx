import React from 'react';
import ImageWithLoader from './ImageWithLoader';
import CommentUsername from './CommentUsername';

const Comment = ({ comment }) => {
    return (
        <div className='flex flex-col w-full gap-4 px-4 py-2 border-l-2 border-black border-solid dark:border-white'>
            {/* Metadata */}
            <div className='flex items-center w-full gap-2'>

                {/* OP Avatar */}

                <div className='relative w-5 h-5'>
                    <ImageWithLoader url={comment.userId.avatarURL} />
                </div>
                <CommentUsername id={comment.userId._id} username={comment.userId.username} />

                <div className='w-1 h-1 bg-black rounded-full dark:bg-white' />

                <span className='text-sm text-black dark:text-white'>{new Date(comment.createdAt).toLocaleString()}</span>

            </div>

            <span>{comment.text}</span>

        </div>
    )
}

export default Comment