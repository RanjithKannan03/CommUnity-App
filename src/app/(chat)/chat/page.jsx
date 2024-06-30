import ChatContent from '@/components/ChatContent';
import ChatList from '@/components/ChatList';
import MainChannelWrapper from '@/components/MainChannelWrapper';
import MobileChat from '@/components/MobileChat';
import React from 'react';


// import 'stream-chat-react/dist/css/v2/index.css';
// import '../../../../styles/streamchat.css';

const page = () => {
    return (
        <div className='flex w-full h-full'>

            <div className='hidden w-[25%] lg:flex h-full p-4'>
                <ChatList />
            </div>

            <div className='flex-1 hidden h-full p-4 lg:flex'>
                <MainChannelWrapper>
                    <ChatContent />
                </MainChannelWrapper>
            </div>


            <MobileChat />


        </div>
    )
}

export default page