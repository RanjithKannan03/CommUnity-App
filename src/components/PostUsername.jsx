'use client';

import React from 'react';
import { userStore } from '@/zustand/store';

const PostUsername = ({ id, username }) => {
    const user = userStore((state) => state.user);
    return (
        <>
            <span className='text-sm text-black dark:text-white'>{user.id === id ? 'You' : username}</span>
        </>
    )
}

export default PostUsername