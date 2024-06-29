import React from 'react';
import { MagnifyingGlass, Plus, ChatCircleDots } from './Icons';
import { faker } from '@faker-js/faker';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

const Navbar = () => {
    faker.seed(123);

    const links = [
        {
            name: "Open Chat",
            href: '/',
            icon: <ChatCircleDots size={25} weight='light' />
        },
        {
            name: "Create Post",
            href: '/',
            icon: <Plus size={25} weight='light' />,
            text: "Create"
        }
    ]

    return (
        <div className='flex justify-between w-full h-full py-4 px-4 border-b-[1px] border-[#DBE4E9] md:px-8 lg:px-20 xl:px-44'>

            {/* Logo and Name */}
            {
                <div className='flex items-center w-1/3'>
                    <span className='text-2xl font-semibold'>CommUnity</span>
                </div>
            }

            {/* Seacrh Bar */}
            <div className='w-1/3 flex items-center gap-2 p-4 text-black bg-[#DBE4E9] rounded-full'>
                <MagnifyingGlass size={25} />
                <input className='flex-1 px-2 bg-transparent focus:outline-none focus:ring-0' placeholder='Search CommUnity' type='text' autoComplete='off' />

            </div>

            {/* Links */}
            <div className='flex items-center justify-end w-1/3 gap-4'>
                {
                    links.map((link) => {
                        return (
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger>
                                        <div className='flex items-center p-2 rounded-full gap-2 justify-center hover:[#DBE4E9]'>
                                            {link.icon}
                                            {
                                                link.text ?
                                                    (
                                                        <span className='font-light text-center'>{link.text}</span>
                                                    )
                                                    :
                                                    null
                                            }
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className='bg-[#333D42] text-white p-2 rounded-2xl text-sm'>
                                            <div class="absolute bottom-full left-1/2 h-0 w-0 border-x-4 border-b-8 border-solid border-x-transparent border-b-[#333D42]" />
                                            <span>{link.name}</span>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default Navbar