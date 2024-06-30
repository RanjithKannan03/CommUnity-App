'use client';

import React from 'react';
import { MediaMsg, Message } from './Message';
import Footer from './Footer';
import Header from './Header';
import { MessageInput, MessageList, useChannelStateContext, useChatContext, useMessageContext } from 'stream-chat-react';



const ChatScreen = (props) => {

    const { isMyMessage, message } = useMessageContext();
    const { channel } = useChannelStateContext();
    const { client, setActiveChannel } = useChatContext();
    const members = Object.values(channel.state.members).filter((user) => { return user.user.id !== client.userID });
    return (
        <div className=' p-4 bg-[#FAFAF9] dark:bg-black drop-shadow-xl rounded-xl shadow-xl'>

            <div className='flex flex-col'>
                {/* Header */}
                <div>
                    <Header name={members[0].user.name} avatarURL={members[0].user.avatarURL} isOnline={members[0].user.online} />
                </div>

                {/* Chat */}
                <div className='w-full h-[calc(100vh-19rem)] bg-[#FAFAF9] dark:bg-black overflow-y-scroll hide-scrollbar'>



                    {/* <div className='flex'>
                        <div className='flex flex-col w-full gap-4 p-4 bg-red-400'>
                            

                        </div>

                    </div> */}

                    <div className='flex flex-col w-full h-full gap-4 px-10 py-4'>
                        <MessageList Message={(props) => { return <Message /> }} />
                    </div>

                </div>

                {/* Footer / Input */}

                <div>

                    <MessageInput Input={Footer} />
                </div>

            </div>

        </div>
    )
}

export default ChatScreen