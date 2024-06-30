'use client';

import React from 'react';

const error = ({ error }) => {
    return (
        <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen text-center bg-white'>
            <span className='text-black'>{error.message}</span>
        </div>
    )
}

export default error