'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SlTrash } from "react-icons/sl";
import FormSubmitButton from '@/components/FormSubmitButton';
import { useFormState } from 'react-dom';
import { createPost } from '@/lib/post';
import CommunitySelectDropdown from '@/components/CommunitySelectDropdown';

const NewPostForm = () => {
    const [pickedImage, setpickedImage] = useState();
    const [state, formAction] = useFormState(createPost, { error: null, user: null });
    const [selectedCommunity, setSelectedCommunity] = useState(null);


    function handleImageChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setpickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setpickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }


    function handleResetImage(event) {
        event.stopPropagation();
        setpickedImage(null);
    }

    function ImageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_120,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }
    return (
        <form className='w-full md:w-[80%] lg:w-[65%] xl:w-[40%] flex flex-col gap-8 rounded-xl bg-[#D7F3FF] dark:bg-[#1F1F1F] p-6' action={formAction}>


            <span className='text-2xl font-semibold'>Create a post</span>

            {
                state.error && (<span className='text-black dark:text-white'>{state.error}</span>)
            }

            <input type='text' hidden name='communityId' value={selectedCommunity?._id} />

            <div className='w-full'>
                <CommunitySelectDropdown selectedCommunity={selectedCommunity} setSelectedCommunity={setSelectedCommunity} />
            </div>



            <div className="flex flex-col items-center justify-center w-full gap-2">
                <span className='self-start text-lg'>Attachment :</span>
                <label htmlFor="dropzone-file-attachment" className={`flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer ${pickedImage ? 'bg-white dark:bg-[#141414]' : 'bg-[#FAFAF9] dark:bg-[#FE686F]'} `}>
                    {pickedImage ?
                        <div className='relative w-full h-full'>

                            <Image src={pickedImage} fill className='object-contain' alt='attachment' />

                            <div className='absolute flex items-center justify-center w-10 h-10 text-white bg-black rounded-full bottom-2 right-2' onClick={handleResetImage}>
                                <SlTrash size={20} />
                            </div>
                        </div>

                        :

                        <div className="flex flex-col items-center justify-center h-full pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-white">SVG, PNG, JPG or GIF</p>
                        </div>
                    }
                    <input id="dropzone-file-attachment" type="file" className="hidden" name='attachment' onChange={handleImageChange} />
                </label>
            </div>

            <div className='flex flex-col w-full gap-2'>

                <span className='self-start text-lg'>Title:</span>

                <input type='text' autoComplete='off' name='title' placeholder='Title' className="w-full px-3 py-2 bg-transparent border border-gray-500 shadow-sm rounded-xl dark:border-white placeholder:text-gray-400" />

            </div>

            <div className='flex flex-col w-full gap-2'>

                <span className='self-start text-lg'>Body :</span>

                <textarea placeholder='Body' name='body' className="flex min-h-[60px] w-full rounded-xl border border-gray-500 dark:border-white bg-transparent px-3 py-2 shadow-sm placeholder:text-gray-400" />

            </div>

            <FormSubmitButton text='Post' />




        </form>
    )
}

export default NewPostForm