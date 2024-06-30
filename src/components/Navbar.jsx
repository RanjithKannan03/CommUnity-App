import React from 'react';
import { Plus, ChatCircleDots } from './Icons';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import Avatar from './Avatar';
import MobileMenu from './MobileMenu';
import Link from 'next/link';
import logo from '../../public/assets/logo.png';
import Image from 'next/image';
import CommunitySearchBar from './CommunitySearchBar';

const Navbar = () => {


    const links = [
        {
            name: "Open Chat",
            href: '/chat',
            icon: <ChatCircleDots size={32} />
        },
        {
            name: "Create Post",
            href: '/post/newPost',
            icon: <Plus size={32} />,
            text: "Create"
        }
    ]

    return (
        <div className='flex justify-between items-center bg-[#5B96F7] dark:bg-[#B43638] w-full h-full py-4 px-4 md:px-8 lg:px-20 xl:px-44 relative'>


            {/* Logo and Name and Burger */}

            <div className='flex items-center gap-4 lg:w-1/3'>
                {/* Mobile Menu */}
                <MobileMenu />

                <Link className='flex items-center gap-4' href='/'>
                    <div className='relative flex items-center justify-center w-16 h-16'>
                        <Image src={logo} fill sizes='64' alt='logo' className='object-contain' />
                    </div>
                    <span className='hidden text-2xl font-semibold lg:flex'>CommUnity</span>
                </Link>
            </div>


            {/* Seacrh Bar */}
            <CommunitySearchBar />

            {/* Links */}
            <div className='flex items-center justify-end gap-4 lg:w-1/3'>
                {
                    links.map((link) => {
                        return (
                            <TooltipProvider key={link.name}>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <Link key={link.name} href={link.href} className='hidden md:flex items-center p-2 rounded-full gap-2 justify-center hover:bg-[#F5F8FA] text-black dark:text-white dark:hover:bg-[#FE686F]'>
                                            {link.icon}
                                            {
                                                link.text ?
                                                    (
                                                        <span className='text-center'>{link.text}</span>
                                                    )
                                                    :
                                                    null
                                            }
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className='relative p-2 text-sm text-white bg-black z-500 rounded-2xl'>
                                            <div class="absolute bottom-full left-1/2 h-0 w-0 border-x-4 border-b-8 border-solid border-x-transparent border-b-black" />
                                            <span>{link.name}</span>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })
                }

                {/* Avatar */}

                <Avatar />


            </div>

        </div>
    )
}

export default Navbar