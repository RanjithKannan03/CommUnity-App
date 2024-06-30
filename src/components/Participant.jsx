'use client';

import React from 'react';
import Image from 'next/image';

const Participant = ({ participant }) => {
    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }

    return (
        <div key={participant._id} className='flex flex-col items-center w-full gap-2'>
            <div className='flex items-center w-full gap-4 p-2 hover:bg-[#D7F3FF] dark:hover:bg-[#FE686F] rounded-xl'>

                <div className='relative w-10 h-10'>

                    {
                        participant.avatarURL === "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" ?
                            (
                                <Image src={participant.avatarURL} fill sizes='40' className='object-cover rounded-full' alt='avatar' />
                            )
                            :
                            (
                                <Image src={participant.avatarURL} fill sizes='40' className='object-cover rounded-full' alt='avatar' loader={ImageLoader} quality={75} />
                            )
                    }

                </div>

                <span className=''>{participant.username}</span>



            </div>
            <div className='w-full h-[1px] dark:bg-white bg-black' />
        </div>
    )
}

export default Participant