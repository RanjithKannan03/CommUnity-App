'use client';

import React from 'react';
import { useChannelStateContext } from 'stream-chat-react';
import ChatScreen from './ChatScreen';


const ChatContent = () => {
    const { channel } = useChannelStateContext();
    return (
        <div className="lg:w-[75vw] w-screen px-4">
            {
                channel.id ?
                    <ChatScreen />
                    :
                    null
            }

        </div>
    )
}

export default ChatContent