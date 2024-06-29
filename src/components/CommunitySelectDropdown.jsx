'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { communityListStore } from '@/zustand/store';

const CommunitySelectDropdown = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const followingCommunities = communityListStore((state) => state.followingCommunities);

    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleSelect = (community) => {
        props.setSelectedCommunity(community);
        setIsOpen(false);
    };
    return (
        <div className='relative flex flex-col w-full gap-2'>
            <label htmlFor="communities" className="text-lg">
                Select a Community :
            </label>
            <div
                className='dark:bg-[#FE686F] bg-[#FAFAF9] p-4 rounded-lg cursor-pointer'
                onClick={toggleDropdown}
            >
                {props.selectedCommunity ? (
                    <div className='flex items-center gap-4'>
                        <div className='relative w-10 h-10'>
                            <Image
                                src={props.selectedCommunity.logoURL}
                                loader={ImageLoader}
                                fill
                                sizes='40'
                                className='object-cover rounded-full'
                                alt='community-logo'
                                quality={75}
                            />
                        </div>
                        <span>{props.selectedCommunity.name}</span>
                    </div>
                ) : (
                    <span className='text-sm font-medium text-black dark:text-white'>Select a Community</span>
                )}
            </div>
            {isOpen && (
                <ul className='absolute z-10 w-full top-full left-0 mt-2 overflow-auto bg-white rounded-lg shadow-lg drop-shadow-lg dark:bg-[#141414] max-h-60'>
                    {followingCommunities.map((community) => (
                        <li
                            key={community.id}
                            className='flex items-center w-full gap-4 px-4 py-2 hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] rounded-xl cursor-pointer'
                            onClick={() => handleSelect(community)}
                        >
                            <div className='relative w-10 h-10'>
                                <Image
                                    src={community.logoURL}
                                    loader={ImageLoader}
                                    fill
                                    sizes='40'
                                    className='object-cover rounded-full'
                                    alt='community-logo'
                                    quality={75}
                                />
                            </div>
                            <span>{community.name}</span>
                        </li>

                    ))}

                </ul>
            )}
        </div>
    )
}

export default CommunitySelectDropdown