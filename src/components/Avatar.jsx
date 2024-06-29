'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { faker } from '@faker-js/faker';
import { AnimatePresence, motion } from 'framer-motion';
import { SignOut } from './Icons';
import ToggleDark from './ToggleDark';

const cardVariant = {
    close: {
        opacity: 0,
        scale: 0
    },
    open: {
        opacity: 1,
        scale: 1
    }
};

const Avatar = () => {
    faker.seed(123);
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <button className='relative w-10 h-10 p-2 rounded-full active:ring-4 active:ring-white' onClick={() => { setIsOpen((prev) => { return !prev }) }}>
                <Image src={faker.image.avatar()} alt='profile-pic' priority fill sizes='40' className='object-contain rounded-full' />
            </button>

            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div variants={cardVariant} initial="close" animate="open" exit="close" className='origin-top-right absolute  w-[275px] sm:right-4 md:right-8 lg:right-20 xl:right-44 top-full z-30 flex flex-col gap-4 py-6 rounded shadow-xl drop-shadow-xl bg-white'>

                            <button className='flex items-center w-full gap-4 px-4 py-2 hover:bg-zinc-100' type='button'>

                                <div className='relative w-10 h-10 p-2'>
                                    <Image src={faker.image.avatar()} alt='profile-pic' fill sizes='40' className='object-contain rounded-full' />
                                </div>

                                <div className='flex flex-col text-start'>

                                    <span className='text-black'>View Profile</span>

                                    {/* username */}
                                    <span className='text-[#8A9BA1] font-light text-sm'>{faker.internet.displayName()}</span>
                                </div>


                            </button>

                            {/* Toggle Dark */}

                            <ToggleDark />

                            {/* Logout */}
                            <button className='flex items-center w-full gap-4 px-4 py-2 text-black hover:bg-zinc-100' type='button'>
                                <SignOut size={27} />
                                <span className=''>Log Out</span>
                            </button>

                        </motion.div>
                    )
                }
            </AnimatePresence>
        </>
    )
}

export default Avatar