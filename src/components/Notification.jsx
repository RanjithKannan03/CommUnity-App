'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SlTrash } from "react-icons/sl";
import { motion } from 'framer-motion';
import { TiTickOutline } from "react-icons/ti";



const Notification = ({ notification, deleteAction, acceptAction }) => {

    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }

    return (
        <motion.div key={notification._id} exit={{ x: '100vw' }} className='flex flex-col items-center w-full gap-2'>
            <div className='group flex items-center w-full gap-4 p-2 hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F]' >

                <Link className='flex items-center gap-4' href={notification.type === "Comment" ? `/post/${notification.postId}` : '#'}>
                    <div className='relative w-10 h-10'>

                        {
                            notification.merchantId.avatarURL === "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" ?
                                (
                                    <Image src={notification.merchantId.avatarURL} fill sizes='40' className='object-cover rounded-full' alt='avatar' />
                                )
                                :
                                (
                                    <Image src={notification.merchantId.avatarURL} fill sizes='40' className='object-cover rounded-full' alt='avatar' loader={ImageLoader} quality={75} />
                                )
                        }

                    </div>

                    {
                        notification.type === 'Comment' ?
                            <div className='flex items-center justify-between flex-1 gap-4'>
                                <span className=''>{notification.merchantId.username} commentd on your post</span>
                                <span className='text-sm font-light lg:hidden'>{new Date(notification.createdAt).toLocaleTimeString()}</span>
                                <span className='hidden text-sm font-light lg:flex'>{new Date(notification.createdAt).toLocaleString()}</span>
                            </div>
                            :
                            <div className='flex items-center justify-between flex-1 gap-4'>
                                <span className=''>{notification.merchantId.username} wants to sell on {notification.communityId.name}</span>
                                <span className='text-sm font-light lg:hidden'>{new Date(notification.createdAt).toLocaleTimeString()}</span>
                                <span className='hidden text-sm font-light lg:flex'>{new Date(notification.createdAt).toLocaleString()}</span>
                            </div>
                    }
                </Link>

                {
                    notification.type === 'Request' ?
                        <div className='flex items-center justify-center w-8 h-8 text-white bg-[#99E2FF] dark:bg-[#B43638] rounded-full' onClick={(e) => { e.preventDefault(); acceptAction(notification._id) }}>
                            <TiTickOutline size={16} />
                        </div>
                        :
                        null
                }


                <div className=' flex items-center justify-center w-8 h-8 text-white bg-[#99E2FF] dark:bg-[#B43638] rounded-full' onClick={(e) => { e.preventDefault(); deleteAction(notification._id); }}>
                    <SlTrash size={16} />
                </div>





            </div>
            <div className='w-full h-[1px]  bg-gray-400' />
        </motion.div>
    )
}

export default Notification