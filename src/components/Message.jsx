'use client';

import React from 'react'
// import { DownloadSimple, Image, X } from './Icons';
import { useState, useEffect } from 'react';
import { AnimatePresence, animate, motion } from 'framer-motion';
import { useMessageContext, useChatContext, useEditHandler } from 'stream-chat-react';
import EditMessage from './EditMessage';
import { RxCross1 } from "react-icons/rx";
import Image from 'next/image';


const optionsVariant = {
    close: {
        scale: 0,
        opacity: 0
    },
    open: {
        scale: 1,
        opacity: 1
    }
}

const Options = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { editing, setEdit, clearEdit } = useEditHandler();
    const { isMyMessage, message } = useMessageContext();


    const Message_options = [
        {
            title: "Edit",
            onPress: () => {
                setEdit();
                console.log(editing);
            }
        },
        {
            title: "Delete Message",
            onPress: () => {
                console.log('Delete');
            }
        },
    ];
    return (
        <>
            {editing ? <EditMessage clearEdit={clearEdit} /> : null}
            <div className='relative py-2'>
                <button className='relative flex items-center w-8 h-4 gap-1' onClick={() => { setIsOpen((prev) => { return !prev }) }}>
                    <div className='w-[3px] h-[3px] rounded-full bg-[#696969]' />
                    <div className='w-[3px] h-[3px] rounded-full bg-[#696969]' />
                    <div className='w-[3px] h-[3px] rounded-full bg-[#696969]' />
                </button>

                <AnimatePresence>
                    {isOpen &&
                        <motion.div variants={optionsVariant} initial="close" animate="open" exit="close" style={{ transformOrigin: isMyMessage() ? 'top right' : 'top left' }} className={`flex gap-2 items-start w-[220px] justify-between bg-white dark:bg-[#141414] absolute z-30 p-4 top-0 ${isMyMessage() ? 'right-full' : 'left-full'} shadow rounded-lg`}>
                            <div className='flex'>
                                <button className='pt-[2px]' onClick={() => { setIsOpen((prev) => { return !prev }) }}>
                                    <RxCross1 size={15} />
                                </button>
                            </div>
                            <div className='flex flex-col justify-center gap-2 '>
                                {
                                    Message_options.map((option) => {
                                        return (
                                            <button className='flex hover:bg-[#E9EAED] dark:hover:text-black px-2 py-1 rounded-xl' onClick={option.onPress} type='button'>{option.title}</button>
                                        )
                                    })
                                }
                            </div>
                        </motion.div>
                    }
                </AnimatePresence>
            </div>
        </>
    )
}

const TextMessage = (props) => {
    const { autoscrollToBottom } = useMessageContext();

    return (
        <div className={`flex flex-col w-full items-center gap-2 ${props.msg.incoming ? 'justify-start' : 'justify-end'} py-4`} onLoad={autoscrollToBottom}>

            <div className={`flex items-center gap-2 grow-0 ${props.msg.incoming ? 'self-start' : 'self-end'}`}>
                {
                    props.msg.options && !props.msg.incoming &&
                    <div className={``}><Options /></div>
                }



                <div className={`flex items-center grow-0 p-4 rounded-3xl drop-shadow-lg max-w-[450px] ${props.msg.incoming ? 'bg-white text-black' : 'bg-[#5B96F7] dark:bg-[#FE686F] text-white'}`}>

                    <span className='max-w-full'>{props.msg.txt}</span>


                </div>

                {
                    props.msg.options && props.msg.incoming &&
                    <div className={``}><Options /></div>
                }
            </div>

            <div className={`flex items-center gap-2  ${props.msg.incoming ? 'self-start' : 'self-end pl-10'}`}>
                {
                    props.msg.edited && !props.msg.incoming ?
                        (<div className='flex items-center gap-2'>
                            <span className={`text-[#696969] text-xs font-light px-2 `}>Edited</span>
                            <div className='bg-[#696969] rounded-full h-[2px] w-[2px]' />
                        </div>
                        )
                        :
                        null
                }
                <span className={`text-[#696969] text-xs font-light px-2 `}>{props.msg.time}</span>
                {
                    props.msg.edited && props.msg.incoming ?
                        (<div className='flex items-center gap-2'>
                            <div className='bg-[#696969] rounded-full h-[2px] w-[2px]' />
                            <span className={`text-[#696969] text-xs font-light px-2 `}>Edited</span>
                        </div>
                        )
                        :
                        null
                }
            </div>





        </div>
    )
}

const MediaMsg = (props) => {
    const { autoscrollToBottom } = useMessageContext();

    return (
        <div className={`flex gap-4 ${props.msg.incoming ? 'justify-start' : 'justify-end'} py-8`} onLoad={autoscrollToBottom}>

            {
                props.msg.options &&
                <div className={`${props.msg.incoming ? 'hidden' : ''}`}><Options /></div>
            }


            <div className='flex flex-col items-center justify-center overflow-hidden rounded-3xl drop-shadow-lg'>
                <div className='max-w-[450px] max-h-[450px]'>
                    {
                        props.attachments[0].type === 'image' ?
                            (
                                <Image src={props.attachments[0].image_url} alt={props.attachments[0].image_url} fill className='relative object-contain' />
                            ) :
                            (<></>)
                    }
                    {
                        props.msg.txt &&
                        <div className={`flex items-center p-4 rounded-3xl drop-shadow-lg max-w-[450px] ${props.msg.incoming ? 'bg-white text-[#696969]' : 'bg-[#5B96F7] text-white'}`}>
                            <span className='max-w-full'>{props.msg.txt}</span>
                        </div>
                    }
                </div>

                <div className='flex items-center self-end gap-2 pl-10'>
                    {
                        props.msg.edited ?
                            (<div className='flex items-center gap-2'>
                                <span className={`text-[#696969] text-xs font-light px-2 `}>Edited</span>
                                <div className='bg-[#696969] rounded-full h-[2px] w-[2px]' />
                            </div>
                            )
                            :
                            null
                    }
                    <span className={`text-[#696969] text-xs font-light px-2 `}>{props.msg.time}</span>
                </div>
            </div>

            {
                props.msg.options &&
                <div className={`${props.msg.incoming ? '' : 'hidden'}`}><Options /></div>
            }
        </div>
    )
}



const TimeLine = (props) => {
    return (
        <div className='flex items-center w-full gap-4'>
            <div className='flex-1 h-[1px] bg-[#696969]' />
            <span className='text-[#696969]'>{props.date.toDateString()}</span>
            <div className='flex-1 h-[1px] bg-[#696969]' />
        </div>
    )
}

const Message = () => {
    const { isMyMessage, message } = useMessageContext();

    if (!message) {
        return null;
    }

    const { attachments, text, created_at, message_text_updated_at } = message;


    if (attachments && attachments.length > 0) {
        return <MediaMsg msg={{ attachments, txt: text, incoming: !isMyMessage(), edited: message_text_updated_at ? true : false, time: created_at.toLocaleTimeString(), options: isMyMessage() ? true : false }} />;
    } else {
        return <TextMessage msg={{ txt: text, incoming: !isMyMessage(), options: isMyMessage() ? true : false, edited: message_text_updated_at ? true : false, time: created_at.toLocaleTimeString() }} />;
    }
}

export { Message, MediaMsg, TextMessage, TimeLine }

