
import React from 'react';
import axios from 'axios';
import Image from 'next/image';


const page = async ({ params }) => {
    const response = await axios.get(`http://localhost:8000/profile?userId=${params.profileId}`);
    console.log(response);
    const user = response.data.data;
    console.log(user);

    return (
        <div className='flex items-start justify-center w-full h-full py-10'>
            <div className='lg:w-[60%] w-full dark:bg-[#1F1F1F] bg-[#E8F5FD] rounded-xl flex justify-center p-8'>

                <div className='flex flex-col items-center justify-start w-full gap-4'>

                    <div className='relative w-32 h-32'>

                        <Image src={user.avatarURL} fill sizes='128px' className='object-cover rounded-full' alt='avatar' />
                    </div>

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
        </div>

    )
}

export default page