'use client';

import React from 'react';
import { userStore } from '@/zustand/store';

const CommentUsername = ({ id, username }) => {
    const user = userStore((state) => state.user);
    return (
        <span className='text-sm text-black dark:text-white'>{id === user.id ? 'You' : username}</span>
    )
}

export default CommentUsername