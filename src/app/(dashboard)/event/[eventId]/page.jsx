import EventLikeButton from '@/components/EventLikeButton';
import { getEvent } from '@/lib/eventPage';
import React from 'react';
import ImageWithLoader from '@/components/ImageWithLoader';
import { RiShare2Line } from "react-icons/ri";
import Image from 'next/image';
import EventTimer from '@/components/EventTimer';
import EventActions from '@/components/EventActions';
import EventNumRegister from '@/components/EventNumRegister';

const page = async ({ params }) => {

    const event = await getEvent(params.eventId);

    return (
        <div className='flex w-full h-[calc(100vh-5rem)] py-10 lg:justify-around'>

            <div className='flex flex-col items-center w-3/4 gap-8 pb-20 overflow-y-auto'>
                {/* Event */}
                <div className='flex flex-col w-full lg:w-[90%] items-start p-3 rounded-xl gap-2 bg-[#D7F3FF] dark:bg-[#1F1F1F]'>

                    {/* Metadata */}

                    <div className='flex items-start w-full gap-2'>
                        <span>Posted To :</span>
                        <div className='relative w-5 h-5'>
                            <ImageWithLoader url={event.communityId.logoURL} />
                        </div>

                        <span className='text-sm text-black dark:text-white'>{event.communityId.name}</span>
                    </div>

                    <div className='flex items-center w-full gap-2'>

                        <span className='font-semibold'>Posted On :</span>

                        <span className='text-sm text-black dark:text-white'>{new Date(event.createdAt).toLocaleString()}</span>

                    </div>

                    {/* Title */}

                    <span className='text-2xl font-semibold text-black dark:text-white'>{event.title}</span>

                    {/* Body */}
                    <span className='text-black dark:text-white' dangerouslySetInnerHTML={{ __html: event.description }}></span>

                    {/* Attachment */}
                    {
                        event.attachmentURL ?
                            (
                                <div className='w-full h-[40rem] relative bg-white dark:bg-black rounded-lg'>
                                    <Image src={event.attachmentURL} fill sizes='640' className='object-contain' alt='event image' />
                                </div>
                            )
                            :
                            null
                    }

                    <div className='flex items-center gap-4'>

                        <EventLikeButton likedUserIds={event.likedUserIds} id={event._id} />



                        <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                            <RiShare2Line size={20} />
                            <span>share</span>
                        </button>

                    </div>

                </div>

            </div>

            <div className='flex-col items-center justify-start hidden w-1/4 h-full gap-4 lg:flex'>

                {/* Event Date */}

                <div className='flex flex-col w-full p-4 rounded-xl gap-4 bg-[#D7F3FF] dark:bg-[#1F1F1F]'>

                    <div className='flex flex-col w-full gap-2'>
                        <span className='text-2xl'>Event Date:</span>

                        {
                            new Date().getTime() - new Date(event.eventDate).getTime() > 0 ?
                                <span className='font-semibold'>Completed</span>
                                :
                                <span className='font-semibold'>{new Date(event.eventDate).toLocaleDateString()}</span>
                        }
                    </div>


                </div>

                {/* Last date */}

                <div className='flex flex-col w-full p-4 rounded-xl gap-4 bg-[#D7F3FF] dark:bg-[#1F1F1F]'>

                    <div className='flex flex-col w-full gap-2'>
                        <span className='text-2xl'>Register Before:</span>

                        <EventTimer targetDate={event.lastDate} />
                    </div>

                    <div className='flex flex-col w-full gap-2'>
                        <span className='text-2xl'>Last Date to Apply:</span>

                        <span className='font-semibold'>{new Date(event.lastDate).toLocaleString()}</span>

                    </div>




                </div>

                {/* Buttons */}

                <div className={`flex flex-col p-4 w-full rounded-xl gap-4 bg-[#D7F3FF] dark:bg-[#1F1F1F] ${event.communityId.adminId === event.userId ? 'flex-1 overflow-hidden' : ''}`}>

                    <EventNumRegister event={event} />

                    <EventActions event={event} />




                </div>


            </div>

        </div>
    )
}

export default page