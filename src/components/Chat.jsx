'use client';

import Image from 'next/image'
import React, { useEffect } from 'react'

import { userStore } from '@/zustand/store';
import { useChatContext } from 'stream-chat-react';


const Chat = (props) => {

    const user = userStore(state => state.user);
    const { client } = useChatContext();

    const id = client.userID;

    const {
        channel,
        activeChannel,
        displayImage,
        displayTitle,
        latestMessage,
        setActiveChannel,
    } = props;

    const isSelected = channel.id === activeChannel?.id;
    const latestMessageAt = channel.state.last_message_at;
    const unreadCount = channel.countUnread();

    function handleClick() {
        setActiveChannel?.(channel);
    }


    const members = Object.values(channel.state.members).filter((user) => { return user.user.id != client.userID });

    console.log(members);



    return (
        <button type='button' onClick={handleClick}>
            <div className={`flex w-full h-20 ${isSelected ? 'dark:bg-[#FE686F] bg-[#5B96F7]' : 'dark:bg-[#141414] bg-white  '} rounded-md shrink-0 drop-shadow-lg  p-4`}>
                <div className='flex items-center w-full gap-4 lg:gap-2'>
                    {/* Profile Pic */}
                    <div className='lg:w-1/4'>
                        <div className='relative w-12 h-12'>
                            <Image src={members[0].user.avatarURL} fill className='object-contain rounded-full' alt='profile pic' />
                            {/* Online Status */}
                            <div className={`absolute h-3 w-3 rounded-full ${members[0].user.online ? 'bg-green-400' : 'bg-red-400'} bottom-0 right-0`} />
                        </div>
                    </div>


                    {/* Name and latest message */}
                    <div className='flex flex-col items-start gap-1 overflow-hidden lg:w-1/2'>
                        {/* Name */}
                        <h1 className={`dark:text-white text-black font-semibold text-sm text-start`}>{displayTitle}</h1>
                        {/* Latest Message */}
                        <span className={`dark:text-white text-black text-xs w-full font-medium overflow-hidden whitespace-nowrap text-start`}>{latestMessage}</span>
                    </div>

                    {/* Latest Message Time and Number of messages */}

                    <div className='flex flex-col items-center gap-1 lg:w-1/4'>
                        {/* Time */}
                        <span className={`dark:text-white text-black text-xs font-light`}>{latestMessageAt?.toLocaleTimeString()}</span>

                        {/* Num Messages */}

                        <div className={`w-4 h-4 dark:bg-[#FE686F] bg-[#1DA1F2] rounded-full flex justify-center items-center ${props.unread && id != props.id > 0 ? 'opacity-100' : 'opacity-0'}`}>
                            <span className={`text-white text-xs`}>{unreadCount}</span>
                        </div>

                    </div>

                </div>
            </div>
        </button>
    )
}

export default Chat