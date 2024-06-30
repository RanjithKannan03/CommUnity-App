'use client';

import React from 'react';
import { useChannelStateContext } from 'stream-chat-react';
import MobileChatScreen from './MobileChatScreen';


const MobileChatContent = () => {
    const { channel } = useChannelStateContext();
    return (
        <div className="lg:w-[75vw] w-screen px-4">
            {
                channel.id ?
                    <MobileChatScreen />
                    :
                    null
            }

        </div>
    )
}

export default MobileChatContent