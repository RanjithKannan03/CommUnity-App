'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMessageContext, useChatContext } from 'stream-chat-react';

const cardVariant = {
    initial: {
        opacity: 0,
        scale: 0
    },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
        }
    }
}

const EditMessage = (props) => {
    const { message } = useMessageContext();
    const [editMessage, setEditMessage] = useState(message.text)
    const { client } = useChatContext();


    async function handleEdit() {
        await client.partialUpdateMessage(message.id, {
            set: {
                text: editMessage
            }
        });
        props.clearEdit();
    }

    return (
        <div className='absolute top-0 left-0 z-50 flex items-center justify-center w-screen h-screen bg-[rgba(0,0,0,0.50)]' onClick={() => { props.clearEdit() }}>

            <motion.div variants={cardVariant} initial="initial" animate="animate" className='w-[30%] h-[20%] bg-white rounded-2xl flex flex-col p-8 justify-between gap-4' onClick={(e) => e.stopPropagation()}>

                <div className='flex flex-col gap-2'>
                    <h1 className='text-lg font-semibold text-black'>Edit Message</h1>
                </div>

                <input type='text' autoComplete='off' className='flex-1 px-4 py-1 shadow rounded-2xl ring-1 ring-black focus:outline-none' value={editMessage} onChange={(e) => { setEditMessage(e.target.value) }} />

                <div className='flex self-end gap-4'>

                    <button className='text-[#5B96F7] font-semibold' onClick={() => { props.clearEdit() }}><span>Cancel</span></button>
                    <button className='text-[#5B96F7] font-semibold' onClick={handleEdit} ><span>Save</span></button>

                </div>

            </motion.div>


        </div>
    )
}

export default EditMessage