import React from 'react';
import { MagnifyingGlass, Plus, ChatCircleDots } from './Icons';
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

const Navbar = () => {


    const links = [
        {
            name: "Open Chat",
            href: '/chat',
            icon: <ChatCircleDots size={32} />
        },
        {
            name: "Create Post",
            href: '/newPost',
            icon: <Plus size={32} />,
            text: "Create"
        }
    ]

    return (
        <div className='flex justify-between items-center bg-[#1DA1F2] dark:bg-[#B43638] w-full h-full py-4 px-4 md:px-8 lg:px-20 xl:px-44 relative'>


            {/* Logo and Name and Burger */}

            <div className='flex items-center gap-4 lg:w-1/3'>
                {/* Mobile Menu */}
                <MobileMenu />

                <div className='flex items-center gap-4'>
                    <div className='relative flex items-center justify-center w-16 h-16'>
                        <Image src={logo} fill sizes='64' alt='logo' className='object-contain' />
                    </div>
                    <span className='hidden text-2xl font-semibold lg:flex'>CommUnity</span>
                </div>
            </div>


            {/* Seacrh Bar */}
            <div className='items-center hidden gap-2 p-2 text-black rounded-full md:flex lg:w-1/3 bg-zinc-100'>
                <MagnifyingGlass size={25} />
                <input className='px-2 bg-transparent lg:flex-1 focus:outline-none focus:ring-0' placeholder='Search CommUnity' type='text' autoComplete='off' />

            </div>

            {/* Links */}
            <div className='flex items-center justify-end gap-4 lg:w-1/3'>
                {
                    links.map((link) => {
                        return (
                            <TooltipProvider>
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