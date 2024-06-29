'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { AiFillHome, AiOutlineHome } from "react-icons/ai";
import { BsArrowUpRightCircle, BsArrowUpRightCircleFill } from "react-icons/bs";
import Link from 'next/link';
import FollowingCommunities from './FollowingCommunities';

const SideNav = () => {

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
    ];

    const path = usePathname();

    return (
        <div className='w-[20%] xl:w-[15%] h-full hidden lg:flex flex-col gap-4 bg-[#FAFAF9] dark:bg-[#1F1F1F] border-[#DBE4E9] px-4 py-8'>

            <div className='flex flex-col w-full gap-2'>

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

            <div className='w-full h-[1px] bg-zinc-200 mt-2' />

            <div className='flex flex-1'>
                <FollowingCommunities />
            </div>



        </div>
    )
}

export default SideNav