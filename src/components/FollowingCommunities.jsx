'use client';

import React, { useState } from 'react';
import { userStore } from '@/zustand/store';
import { AnimatePresence, motion } from 'framer-motion';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { IoIosArrowUp } from "react-icons/io";

const arrowVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: 180
    }
}

const FollowingCommunities = () => {
    faker.seed(123);
    const user = userStore((state) => state.user);
    const [isOpen, setIsOpen] = useState(close);
    return (
        <div className='flex flex-col w-full gap-2 h-2/3'>

            <div className='flex items-center w-full hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] p-2 rounded-xl justify-between' onClick={() => { setIsOpen((prev) => { return !prev }) }}>
                <span className='text-lg'>Your Communities</span>
                <motion.div variants={arrowVariant} initial="close" animate={isOpen ? 'open' : null}>
                    <IoIosArrowUp size={20} />
                </motion.div>
            </div>

            <AnimatePresence>
                {
                    isOpen && (
                        <motion.div className='flex-col items-center w-full overflow-y-auto' initial={{ height: 0 }} animate={{ height: 500 }} exit={{ height: 0 }}>

                            <div className='flex flex-col items-center w-full gap-2'>

                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>


                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>


                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>


                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>


                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>


                                <div className='flex items-center w-full gap-4 p-4'>

                                    <div className='relative w-10 h-10'>

                                        <Image src={faker.image.avatar()} fill sizes='40' className='object-contain rounded-full' />

                                    </div>

                                    <span className=''>{faker.company.name()}</span>

                                </div>

                            </div>

                        </motion.div>
                    )
                }
            </AnimatePresence>


        </div>
    )
}

export default FollowingCommunities