'use client';

import React from 'react';
import { faker } from '@faker-js/faker';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { communityListStore, userStore } from '@/zustand/store';
import Link from 'next/link';

const CommunitiesList = (props) => {
    faker.seed(123);
    const open = communityListStore((state) => state.open);
    const user = userStore((state) => state.user);

    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }

    return (
        <AnimatePresence>
            {
                open ? user.followingCommunityIDs.length > 0 ?
                    (
                        <motion.div key={1} className='flex-col items-center w-full overflow-y-auto' initial={{ height: 0 }} animate={{ height: 500 }} exit={{ height: 0 }}>

                            <div key={1} className='flex flex-col items-center w-full gap-2'>

                                {props.communities.map((community) => {
                                    return (
                                        <Link key={community.id} className='flex items-center w-full gap-4 px-4 py-2 hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] rounded-xl' href={`/community/${community._id}`}>

                                            <div className='relative w-10 h-10'>

                                                <Image src={community.logoURL} loader={ImageLoader} fill sizes='40' className='object-cover rounded-full' alt='community-logo' quality={75} />

                                            </div>

                                            <span className=''>{community.name}</span>

                                        </Link>

                                    )
                                })}

                            </div>

                        </motion.div>
                    )
                    :
                    <motion.div className='flex items-center justify-center w-full text-black dark:text-white' initial={{ height: 0 }} animate={{ height: 100 }} exit={{ height: 0 }}>

                        <span>You're not currently following any communities.</span>

                    </motion.div>
                    :
                    null
            }
        </AnimatePresence>

    )
}

export default CommunitiesList