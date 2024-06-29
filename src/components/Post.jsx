import Image from 'next/image';
import React from 'react';
import { IoChatboxOutline } from "react-icons/io5";
import { RiShare2Line } from "react-icons/ri";
import PostLikeButton from './PostLikeButton';
import axios from 'axios';

const Post = (props) => {

    return (
        <div className='flex flex-col w-full lg:w-[65%] items-start p-3 rounded-xl gap-2 hover:bg-[#D7F3FF] dark:hover:bg-[#1F1F1F]'>

            {/* Metadata */}

            <div className='flex items-center w-full gap-2'>

                {/* OP Avatar */}

                <div className='relative w-5 h-5'>
                    <Image src={props.avatarURL} fill sizes='20' className='object-contain rounded-full' alt='community avatar' />
                </div>

                <span className='text-sm text-black dark:text-white'>{props.name}</span>

                <div className='w-1 h-1 bg-black rounded-full dark:bg-white' />

                <span className='text-sm text-black dark:text-white'>{props.time.toLocaleString()}</span>

            </div>

            {/* Title */}

            <span className='text-2xl font-semibold text-black dark:text-white'>{props.title}</span>



            {
                props.attachmentURL ?
                    (
                        <div className='w-full h-[40rem] relative'>
                            <Image src={props.attachmentURL} fill sizes='640' className='object-contain' alt='post image' />
                        </div>
                    )
                    :
                    <span className='text-black dark:text-white line-clamp-4'>{props.body}</span>
            }


            <div className='flex items-center gap-4'>

                <PostLikeButton likedUserIds={props.likedUserIds} id={props.id} />

                <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                    <IoChatboxOutline size={20} />
                    <span>{props.numComments}</span>
                </button>

                <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                    <RiShare2Line size={20} />
                    <span>share</span>
                </button>


            </div>

            <div className='w-full h-[1px] bg-zinc-200 mt-2' />

        </div>



    )
}

export default Post