'use client';

import React, { useState, useEffect } from 'react';
import Chat from './Chat';
import { ChannelList } from 'stream-chat-react';
import { useChatContext } from 'stream-chat-react';
import List from './List';
import { userStore } from '@/zustand/store';
import NewChat from './NewChat';
import { FaPlus } from "react-icons/fa6";
import { AnimatePresence } from 'framer-motion';
import MobileChatItem from './MobileChatItem';




const MobileChatList = () => {

    const { client, setActiveChannel } = useChatContext();

    const filter = { members: { $in: [client.userID] } };

    const sort = { last_message_at: -1 };

    const user = userStore(state => state.user);

    const [addChat, setAddChat] = useState(false);







    return (
        <div className="flex flex-col w-full h-full gap-4 p-4 bg-[#FAFAF9] dark:bg-black drop-shadow-xl rounded-xl shadow-xl">


            {/* Options */}
            <div className="h-auto">
                <div className="flex flex-col w-full h-full gap-8">

                    {/* Title */}
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-4xl font-bold">Chats</h1>
                    </div>

                    {/* Archive */}
                    <button className="flex w-full items-center gap-2 hover:text-[#5B96F7] dark:hover:text-[#FE686F]" onClick={() => { setAddChat(true) }}>
                        <FaPlus />
                        <span>Add Chat</span>
                    </button>

                    {/* Line */}
                    <div className="w-full h-[1px] bg-[#B4B4B4]" />

                </div>
            </div>

            {/* Contacts List */}

            <div className="flex flex-col flex-1 w-full gap-4">



                {/* All Messages */}
                <div className='h-full' id='message-list'>

                    <ChannelList
                        filters={filter}
                        sort={sort}
                        List={(listProps) => (
                            <List {...listProps} type="messaging" />
                        )}
                        Preview={(previewProps) => (
                            <MobileChatItem {...previewProps} type="messaging" />
                        )}
                    />


                </div>


            </div>

            <AnimatePresence>
                {
                    addChat && (
                        <NewChat setAddChat={setAddChat} />
                    )
                }
            </AnimatePresence>



        </div>
    )
}

export default MobileChatList