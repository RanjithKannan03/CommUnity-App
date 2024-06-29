'use client';

import React from 'react';
import { descriptionStore } from '@/zustand/store';

const DescriptionLimited = (props) => {
    const toggle = descriptionStore((state) => state.toggle);

    return (
        <button type='button' className='flex items-center justify-center w-full p-4 text-center' onClick={toggle}>
            <span className='text-lg font-semibold leading-8 line-clamp-4'>{props.description}</span>
        </button>
    )
}

export default DescriptionLimited