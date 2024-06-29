'use client';

import React from 'react';
import { descriptionStore } from '@/zustand/store';
import { motion, AnimatePresence, m } from 'framer-motion';

const descriptionCardVariant = {
    close: {
        scale: 0,
        opacity: 0
    },
    open: {
        scale: 1,
        opacity: 1
    }
}

const DescriptionFull = (props) => {
    const open = descriptionStore((state) => state.open);
    const toggle = descriptionStore((state) => state.toggle);
    return (
        <AnimatePresence mode='wait'>
            {
                open ?
                    (
                        <div className='w-screen h-screen absolute top-0 left-0 flex items-center justify-center bg-[rgba(0,0,0,0.80)]' onClick={toggle}>

                            {/* Description Card */}

                            <motion.div variants={descriptionCardVariant} initial='close' animate='open' exit='close' className='p-4 rounded-xl shadow-2xl drop-shadow-2xl w-full lg:w-[65%] flex items-center justify-center bg-[#D7F3FF] text-center dark:bg-[#1F1F1F]'>
                                <span className='text-lg font-semibold leading-8'>{props.description}</span>
                            </motion.div>

                        </div>
                    )
                    :
                    null
            }
        </AnimatePresence>
    )
}

export default DescriptionFull