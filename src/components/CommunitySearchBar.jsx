'use client';

import React, { useState } from 'react';
import { MagnifyingGlass } from './Icons';
import { search } from '@/lib/search';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const CommunitySearchBar = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState([]);


    async function handleChange(e) {
        setQuery(e.target.value);
        if (e.target.value === '') {
            setResult([]);
            return;
        }
        const searchResult = await search(e.target.value);
        setResult(searchResult);
    }

    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }

    return (
        <motion.div
            transition={{ duration: 0.5, when: 'afterChildren' }} className={`relative items-center hidden gap-2 p-2 text-black shadow-2xl drop-shadow-2xl z-50 ${query ? 'rounded-t-xl' : 'rounded-full'} md:flex lg:w-1/3 bg-zinc-100`}>
            <MagnifyingGlass size={25} />
            <input className='px-2 bg-transparent lg:flex-1 focus:outline-none focus:ring-0' placeholder='Search CommUnity' type='text' autoComplete='off' value={query} onChange={handleChange} />

            <AnimatePresence>
                {
                    query &&
                    (
                        <motion.div initial={{ height: 0 }} animate={{ height: 300 }} exit={{ height: 0 }} className='absolute z-30 left-0 w-full text-black h-[300px] hidden shadow-2xl drop-shadow-2xl rounded-b-xl md:flex bg-zinc-100 top-full flex-col items-center overflow-y-auto'>

                            <div className='flex flex-col items-center w-full gap-2 relative z-[50]'>

                                {result.map((community) => {
                                    return (
                                        <Link className='flex flex-col w-full gap-2 px-4' href={`/community/${community._id}`} onClick={() => {
                                            setQuery('');
                                            setResult([]);
                                        }}>
                                            <div className='flex items-center w-full gap-4 px-4 py-2 hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] rounded-xl'>

                                                <div className='relative w-10 h-10'>

                                                    <Image src={community.logoURL} fill sizes='40' className='object-cover rounded-full' alt='community-logo' loader={ImageLoader} quality={75} />

                                                </div>

                                                <span className=''>{community.name}</span>

                                            </div>

                                            <div className='w-full bg-slate-500 h-[1px] px-4' />
                                        </Link>
                                    )
                                })}




                            </div>

                        </motion.div>
                    )
                }
            </AnimatePresence>

        </motion.div>
    )
}

export default CommunitySearchBar