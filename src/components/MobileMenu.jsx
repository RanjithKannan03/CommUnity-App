'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsArrowUpRightCircle, BsArrowUpRightCircleFill, BsChatDots, BsChatDotsFill } from "react-icons/bs";
import { HiPlus } from "react-icons/hi2"
import Link from 'next/link';
import FollowingCommunities from './FollowingCommunities';

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

const menuVariant = {
    close: {
        x: '-100vw'
    },
    open: {
        x: 0,
        transition: {
            type: 'spring',
            damping: 15,
            mass: 0.4,
            duration: 0.2
        }
    }
}

const MobileMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const links = [
        {
            text: 'Home',
            currentPathIcon: <AiFillHome size={25} />,
            icon: <AiOutlineHome size={25} />,
            url: '/'
        },
        {
            text: 'Popular',
            currentPathIcon: <BsArrowUpRightCircleFill size={25} />,
            icon: <BsArrowUpRightCircle size={25} />,
            url: '/popular'
        },
        {
            text: 'Chat',
            currentPathIcon: <BsChatDotsFill size={25} />,
            icon: <BsChatDots size={25} />,
            url: '/chat'
        },
        {
            text: 'Create Post',
            currentPathIcon: <HiPlus size={25} />,
            icon: <HiPlus size={25} />,
            url: '/newPost'
        }
    ];
    const path = usePathname();

    // Effect to add/remove overflow-hidden class on body
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    return (
        <>
            <div className='w-10 h-10 px-2 py-3 lg:hidden rounded-full hover:bg-[#F5F8FA] dark:hover:bg-[#FE686F] flex flex-col justify-between items-center cursor-pointer' onClick={() => { setIsOpen((prev) => { return !prev }) }}>
                <motion.div variants={topDivVariant} initial='close' animate={isOpen ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
                <motion.div variants={middleDivVariant} initial='close' animate={isOpen ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
                <motion.div variants={bottomDivVariant} initial='close' animate={isOpen ? 'open' : 'close'} className='w-[19px] h-[3px] bg-black dark:bg-white rounded origin-left' />
            </div>

            <AnimatePresence>
                {isOpen ? (
                    <div className='absolute top-[5rem] left-0 z-30 w-screen h-[calc(100vh-3.5rem)] lg:hidden bg-[rgba(0,0,0,0.5)]'>
                        <motion.div variants={menuVariant} initial='close' animate='open' exit='close' className='h-full w-[45%] md:w-[35%] flex flex-col gap-4 bg-[#FAFAF9] dark:bg-[#1F1F1F] border-[#DBE4E9] p-4'>

                            {/* Navlinks */}
                            <div className='flex flex-col w-full gap-3'>

                                {
                                    links.map((link) => {
                                        return (
                                            <Link key={link.text} href={link.url} className={`flex w-full gap-4 px-4 py-2 rounded-xl text-black dark:text-white ${path === link.url ? 'bg-[#99E2FF] dark:bg-[#AF1B34]' : 'hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F]'}`}>
                                                {
                                                    path === link.url ?
                                                        link.currentPathIcon :
                                                        link.icon
                                                }
                                                <span className='text-lg'>{link.text}</span>
                                            </Link>
                                        )
                                    })
                                }

                            </div>

                            <div className='flex flex-1'>
                                <FollowingCommunities />
                            </div>

                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
        </>
    )
}

export default MobileMenu;
