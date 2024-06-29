'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { SlTrash } from "react-icons/sl";
import FormSubmitButton from '@/components/FormSubmitButton';
import { useFormState } from 'react-dom';
import { createCommunity } from '@/lib/community';
import { userStore } from '@/zustand/store';

const page = () => {
    const [pickedBanner, setPickedBanner] = useState();
    const [pickedLogo, setPickedLogo] = useState();
    const [state, formAction] = useFormState(createCommunity, { error: null, user: null });
    const loginUser = userStore((state) => state.loginUser);


    function handleBannerChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedBanner(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedBanner(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    function handleLogoChange(event) {
        const file = event.target.files[0];
        if (!file) {
            setPickedLogo(null);
            return;
        }
        const fileReader = new FileReader();
        fileReader.onload = () => {
            setPickedLogo(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }

    function handleResetBanner(event) {
        event.stopPropagation();
        setPickedBanner(null);
    }

    function handleResetLogo(event) {
        event.stopPropagation();
        setPickedLogo(null);
    }

    return (
        <div className='flex items-center justify-center flex-1 py-4'>

            <form className='w-full md:w-[80%] lg:w-[65%] xl:w-[40%] flex flex-col gap-8 rounded-xl bg-[#D7F3FF] dark:bg-[#1F1F1F] p-6' action={formAction}>

                <span className='text-2xl font-semibold'>Create your own Community</span>

                {
                    state.error && (<span className='text-black dark:text-white'>{state.error}</span>)
                }

                <div className="flex flex-col items-center justify-center w-full gap-2">
                    <span className='self-start text-lg'>Banner Image :</span>
                    <label htmlFor="dropzone-file-banner" className={`flex flex-col items-center justify-center w-full h-40 rounded-lg cursor-pointer ${pickedBanner ? null : 'bg-[#FAFAF9] dark:bg-[#FE686F]'} `}>
                        {pickedBanner ?
                            <div className='relative w-full h-full'>

                                <Image src={pickedBanner} fill className='object-cover' alt='banner-image' />

                                <div className='absolute flex items-center justify-center w-10 h-10 text-white bg-black rounded-full bottom-2 right-2' onClick={handleResetBanner}>
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
                        <input id="dropzone-file-banner" type="file" className="hidden" name='banner' onChange={handleBannerChange} />
                    </label>
                </div>

                <div className='flex items-center justify-start w-full gap-4'>

                    <span className='text-lg '>Logo :</span>

                    <label htmlFor="dropzone-file-logo" className={`flex flex-col items-center justify-center w-28 h-28 rounded-full cursor-pointer ${pickedLogo ? null : 'bg-[#FAFAF9] dark:bg-[#FE686F]'}`}>
                        {
                            pickedLogo ?
                                <div className='relative w-full h-full rounded-full'>

                                    <Image src={pickedLogo} fill className='object-cover rounded-full' alt='logo-image' />
                                    <div className='absolute flex items-center justify-center w-10 h-10 text-white bg-black rounded-full bottom-2 right-2' onClick={handleResetLogo}>
                                        <SlTrash size={20} />
                                    </div>
                                </div>
                                :
                                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">

                                    <p className="mb-2 text-sm text-gray-500 dark:text-white"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                </div>
                        }
                        <input id="dropzone-file-logo" type="file" className="hidden" name='logo' onChange={handleLogoChange} />
                    </label>

                </div>

                <div className='flex flex-col w-full gap-2'>

                    <span className='self-start text-lg'>Community Name :</span>

                    <input type='text' autoComplete='off' name='name' placeholder='Enter Name' className="w-full px-3 py-2 bg-transparent border border-gray-500 shadow-sm rounded-xl dark:border-white placeholder:text-gray-400" />

                </div>

                <div className='flex flex-col w-full gap-2'>

                    <span className='self-start text-lg'>Community Description :</span>

                    <textarea placeholder='Enter Description' name='description' className="flex min-h-[60px] w-full rounded-xl border border-gray-500 dark:border-white bg-transparent px-3 py-2 shadow-sm placeholder:text-gray-400" />

                </div>

                <FormSubmitButton text='Create Community' />




            </form>


        </div>
    )
}

export default page