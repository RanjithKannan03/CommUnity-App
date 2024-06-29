'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { IoIosArrowUp } from "react-icons/io";
import { communityListStore } from '@/zustand/store';

const arrowVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: 180
    }
}

const ExpandCommunityList = () => {
    const toggle = communityListStore((state) => state.toggle);
    const open = communityListStore((state) => state.open);
    return (
        <div className='flex items-center w-full hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] p-2 rounded-xl justify-between' onClick={() => { toggle() }}>
            <span className='text-lg'>Your Communities</span>
            <motion.div variants={arrowVariant} initial="close" animate={open ? 'open' : null}>
                <IoIosArrowUp size={20} />
            </motion.div>
        </div>
    )
}

export default ExpandCommunityList