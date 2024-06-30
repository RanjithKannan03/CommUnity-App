'use client';

import React, { useState } from 'react';
import CommunityPosts from '@/components/CommunityPosts';
import { motion } from 'framer-motion';
import CommunityEvents from './CommunityEvents';

const CommunityPageContent = ({ posts, events }) => {

    const options = [
        {
            name: 'Posts'
        },
        {
            name: 'Events'
        },
        {
            name: 'Volunteer Events'
        }
    ];

    const [type, setType] = useState('Posts');
    return (
        <div className='flex flex-col items-center w-full gap-4'>

            <div className='flex items-center gap-8 w-full lg:w-[65%] p-4'>
                {options.map((option, index) => {
                    return (
                        <button type='button' key={index} className={`relative ${option.name === type ? 'text-[#99E2FF] dark:text-[#AF1B34]' : 'text-black dark:text-white'}`} onClick={() => { setType(option.name) }}>
                            <span>{option.name}</span>
                            {
                                option.name === type ?
                                    <motion.div layoutId='option-pill' className='absolute -bottom-1 h-[2px] w-full bg-[#99E2FF] dark:bg-[#AF1B34]' />
                                    :
                                    null
                            }
                        </button>
                    )
                })}

            </div>

            {/* Posts */}
            {
                type === 'Posts' ? <CommunityPosts posts={posts} /> : <CommunityEvents events={events} />
            }
            {/* <CommunityPosts posts={posts} /> */}
        </div>
    )
}

export default CommunityPageContent