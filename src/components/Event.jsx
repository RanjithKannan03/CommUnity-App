import Image from 'next/image';
import React from 'react';
import { RiShare2Line } from "react-icons/ri";
import Link from 'next/link';
import EventLikeButton from './EventLikeButton';

const Event = (props) => {

    return (
        <div className='flex flex-col w-full lg:w-[65%] items-start p-3 rounded-xl gap-2 hover:bg-[#E8F5FD] dark:hover:bg-[#1F1F1F]'>

            <Link className='flex flex-col w-full gap-2' href={`/event/${props.id}`}>

                {/* Metadata */}

                <div className='flex items-center w-full gap-2'>

                    <span className='font-semibold'>Posted On :</span>

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
                        <div className='text-black dark:text-white line-clamp-4' dangerouslySetInnerHTML={{ __html: props.description }}></div>
                }
            </Link>


            <div className='flex items-center gap-4'>

                <EventLikeButton likedUserIds={props.likedUserIds} id={props.id} />


                <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                    <RiShare2Line size={20} />
                    <span>share</span>
                </button>


            </div>

            <div className='w-full h-[1px] bg-zinc-200 mt-2' />

        </div>



    )
}

export default Event