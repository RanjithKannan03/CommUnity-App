'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const CommentSubmitButton = (props) => {
    const status = useFormStatus();

    if (status.pending) {
        return <p>loading...</p>
    }

    return (
        <button className='w-full p-2 rounded-full text-black dark:text-white bg-[#99E2FF] dark:bg-[#FE686F] text-sm'>
            {props.text}
        </button>
    )
}

export default CommentSubmitButton