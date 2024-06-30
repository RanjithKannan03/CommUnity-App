'use client';

import MainChannelWrapper from '@/components/MainChannelWrapper';
import React, { useState } from 'react';
import MobileChatContent from './MobileChatContent';
import { chatListStore } from '@/zustand/store';
import MobileChatList from './MobileChatList';
import { motion } from 'framer-motion';

const MobileChat = () => {
    const open = chatListStore((state) => state.open);
    return (
        <div className='relative flex items-center justify-center w-full h-full lg:hidden'>


            <motion.div className={`absolute top-0 left-0 z-10 w-full h-full p-4 lg:flex ${open ? 'flex' : 'hidden'}`}>
                <MobileChatList />
            </motion.div>

            <div className='flex-1 h-full p-4 lg:flex'>
                <MainChannelWrapper>
                    <MobileChatContent />
                </MainChannelWrapper>
            </div>



        </div>
    )
}

export default MobileChat