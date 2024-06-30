'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { chatListStore } from '@/zustand/store';

const topDivVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: 45
    }
}

const middleDivVariant = {
    close: {
        opacity: 1
    },
    open: {
        opacity: 0
    }
}

const bottomDivVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: -45
    }
}


const MobileHeader = (props) => {
    const open = chatListStore((state) => state.open);
    const toggle = chatListStore((state) => state.toggle);
    return (
        <div className='w-full h-20 bg-[#D7F3FF] dark:bg-[#141414] dark:text-white text-black flex justify-between items-center px-8 rounded-xl'>

            {/* User Info */}
            <div className='flex items-center gap-4'>

                <div>
                    <Toggle avatarURL={props.avatarURL} isOnline={props.isOnline} />
                </div>

                <div className='flex flex-col justify-center'>
                    <h1 className='text-lg font-semibold'>{props.name}</h1>
                    <span className='text-[#696969] text-sm'>{props.isOnline ? 'Online' : 'Offline'}</span>
                </div>

            </div>

            {/* Toggle Chat List */}

            <div className='w-10 h-10 px-2 py-3 lg:hidden rounded-full hover:bg-[#F5F8FA] dark:hover:bg-[#FE686F] flex flex-col justify-between items-center cursor-pointer relative' onClick={toggle}>
                <motion.div variants={topDivVariant} initial='close' animate={open ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
                <motion.div variants={middleDivVariant} initial='close' animate={open ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
                <motion.div variants={bottomDivVariant} initial='close' animate={open ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
            </div>

        </div>
    )
}


export const Toggle = (props) => {
    return (
        <div className='relative w-12 h-12 cursor-pointer'>
            <Image src={props.avatarURL} fill className='object-contain rounded-full' alt='avatar' />
            {/* Online Status */}
            <div className={`absolute h-3 w-3 rounded-full ${props.isOnline ? 'bg-green-400' : 'bg-red-400'} bottom-0 right-0`} />
        </div>
    )
}



export default MobileHeader