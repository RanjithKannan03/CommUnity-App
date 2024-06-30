'use client';

import React, { useState, useEffect, useRef } from 'react'
import { userStore } from '@/zustand/store';
import Image from 'next/image';
import { RxPencil1 } from "react-icons/rx";
import { editAvatr } from '@/lib/profile';
import { useFormStatus } from 'react-dom';

const MyProfile = () => {
    const user = userStore((state) => state.user);
    const [imageToCrop, setImageToCrop] = useState(undefined);

    const fileInputRef = useRef();
    const status = useFormStatus();
    const onUploadFile = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            const reader = new FileReader();

            reader.addEventListener('load', () =>
                setImageToCrop(reader.result)
            );

            reader.readAsDataURL(event.target.files[0]);
        }
    };

    return (
        <div className='lg:w-[60%] w-full dark:bg-[#1F1F1F] bg-[#E8F5FD] rounded-xl flex justify-center p-8'>

            <div className='flex flex-col items-center justify-start w-full gap-4'>

                <form className='relative w-32 h-32' action={editAvatr}>
                    {
                        imageToCrop ?
                            <Image src={imageToCrop} fill sizes='128px' className='object-cover rounded-full' alt='avatar' />
                            :
                            <Image src={user.avatarURL} fill sizes='128px' className='object-cover rounded-full' alt='avatar' />
                    }
                    <input ref={fileInputRef} type="file" name='attachment' onChange={onUploadFile} hidden />

                    {imageToCrop ?
                        <button className='absolute flex items-center justify-center p-2 text-center rounded-full top-1/2 -right-1/2 ring-1 ring-black dark:ring-white'>Submit</button>
                        :
                        <div className='absolute flex gap-4 items-center justify-center w-10 h-10 text-lg rounded-full hover:bg-[#5B96F7] hover:text-white dark:hover:bg-white cursor-pointer dark:hover:text-black top-1/2 -right-1/2' onClick={() => { fileInputRef.current?.click() }}>
                            <RxPencil1 size={28} />

                        </div>
                    }

                    {status.pending ?
                        <div className='w-32 h-32 bg-[rgba(0,0,0,0.35)] absolute top-0 left-0 rounded-full' />
                        : null
                    }
                </form>

                <div className='flex flex-col items-start w-full lg:w-[60%] gap-2'>

                    <div className='flex items-center gap-2'>

                        <span className='text-lg font-light lg:text-xl'>Email:</span>

                        <span className='text-lg lg:text-xl'>{user.email}</span>

                    </div>

                    <div className='flex items-center gap-2'>

                        <span className='text-lg font-light lg:text-xl'>Username:</span>

                        <span className='text-lg lg:text-xl'>{user.username}</span>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default MyProfile