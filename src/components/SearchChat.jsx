import React from 'react';
import Image from 'next/image';

const SearchChat = (props) => {
    return (
        <div className={`flex w-full h-20 bg-white dark:bg-black group hover:bg-[#1DA1F2] dark:hover:bg-[#FE686F] rounded-md shrink-0 drop-shadow-lg  p-4`} onClick={() => { props.createChannel(props.client) }}>
            <div className='flex items-center w-full gap-4'>
                {/* Profile Pic */}
                <div className=''>
                    <div className='relative w-14 h-14'>
                        <Image src={props.client.avatarURL} fill className='object-contain rounded-full' alt='profile pic' />
                        {/* Online Status */}
                        <div className={`absolute h-3 w-3 rounded-full ${props.client.isActive ? 'bg-green-400' : 'bg-red-400'} bottom-0 right-0`} />
                    </div>
                </div>


                {/* Name and latest message */}
                <div className='flex flex-col items-start w-1/2 gap-1 overflow-hidden'>
                    {/* Name */}
                    <h1 className={`group-hover:text-white text-black dark:text-white font-semibold text-sm text-start`}>{props.client.name}</h1>

                </div>





            </div>
        </div>
    )
}

export default SearchChat