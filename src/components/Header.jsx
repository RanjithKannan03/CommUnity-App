'use client';

import React from 'react';
import Image from 'next/image';

const Header = (props) => {
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

            {/* Actions */}
            {/* <div className='flex gap-5 items-center text-[#595959]'>
                <div className='flex items-center gap-8'>
                    <button><VideoCamera size={25} /></button>
                    <button><Phone size={25} /></button>
                    <button><MagnifyingGlass size={25} /></button>
                </div>
                <div className='h-10 w-[1px] bg-[#595959]' />
                <button><CaretDown size={25} /></button>
            </div> */}

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



export default Header