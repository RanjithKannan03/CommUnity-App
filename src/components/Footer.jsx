'use client';

import React, { useState } from 'react'
import { Link, Smiley, PaperPlaneTilt } from '@phosphor-icons/react/dist/ssr';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import { motion, AnimatePresence } from 'framer-motion';
import { useMessageInputContext } from 'stream-chat-react';

const emojiPieckerVariant = {
    close: {
        y: "100vh"
    },
    open: {
        y: 0,
        transition: {
            type: "spring",
            mass: 0.4,
            damping: 6
        }
    },
    exit: {
        y: "100vw",
        transition: {
            duration: 0.5
        }
    }
}

const Footer = () => {
    const [msg, setMsg] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const { text, handleChange, handleSubmit, insertText, textareaRef } = useMessageInputContext()

    return (
        <div className='flex items-center w-full h-20 bg-[#FAFAF9] dark:bg-transparent px-8 gap-8'>
            <div className='flex-1 flex items-center h-12 px-4 bg-[#D7F3FF] dark:bg-[#141414] rounded-lg text-[#709CE6] dark:text-white gap-4 relative'>
                <div className='flex-1'>
                    <input type='text' className='w-full outline-none placeholder-[#709CE6] dark:placeholder-white bg-transparent px-2' placeholder='Write a message...' value={text} onChange={handleChange} />
                </div>
                <div className=''>
                    <button type='button' onClick={() => { setIsOpen((prev) => { return (!prev) }) }}>
                        <Smiley size={25} />
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div key={1} variants={emojiPieckerVariant} initial="close" animate="open" className='absolute right-0 bottom-12' exit="exit">
                                <Picker data={data} onEmojiSelect={(emoji) => {
                                    insertText(emoji.native);
                                    textareaRef.current?.focus();
                                }} theme="light" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
            <button className='flex items-center justify-center h-12 w-12 bg-[#5B96F7] dark:bg-[#FE686F] text-white rounded-lg' onClick={handleSubmit}>
                <PaperPlaneTilt size={25} />
            </button>
        </div>
    )
}

export default Footer