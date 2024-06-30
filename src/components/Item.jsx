import React from 'react';
import Image from 'next/image';

const Item = (props) => {
    return (
        <div className='rounded-lg p-4 flex flex-col gap-4 items-center dark:bg-[#1F1F1F] bg-[#E8F5FD] '>

            <div className='relative w-full bg-white h-60 dark:bg-black'>
                <Image src={props.attachmentURL} fill alt='item-image' className='object-contain' />

            </div>

            <div className='flex flex-col self-start gap-4'>

                <span className='text-2xl font-semibold'>{props.name}</span>

                <span>{props.description}</span>

                <span>{props.price}</span>
            </div>

        </div>
    )
}

export default Item