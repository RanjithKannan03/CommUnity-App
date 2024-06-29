'use client';

import React from 'react';
import CommentSubmitButton from './CommentSubmitButton';
import { useFormState } from 'react-dom';
import { createComment } from '@/lib/comments';


const NewCommentForm = (props) => {

    const [state, formAction] = useFormState(createComment, { error: null });
    return (
        <form className='w-full lg:w-[65%] rounded-xl ring-1 ring-black dark:ring-white flex flex-col gap-4 p-2' action={formAction}>
            <input type='text' name='postId' hidden value={props.postId} />
            <textarea placeholder='Enter your comment' name='comment' className="flex min-h-[24px] w-full rounded-xl focus:outline-0 bg-transparent px-3 py-2 placeholder:text-gray-400" />

            <div className='flex items-center self-end gap-2'>
                {/* <button className='w-full p-2 rounded-full text-black dark:text-white bg-[#99E2FF] dark:bg-[#FE686F] text-sm'>
                    Cancel
                </button> */}
                <CommentSubmitButton text="Comment" />
            </div>
        </form>
    )
}

export default NewCommentForm