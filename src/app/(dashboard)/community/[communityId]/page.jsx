import React from 'react';
import axios from 'axios';
import CommunityBanner from '@/components/CommunityBanner';
import CommunityLogo from '@/components/CommunityLogo';
import { JoinCommunityButton } from '@/components/JoinCommunityButton';


const page = async ({ params }) => {
    const response = await axios.get(`http://localhost:8000/community/${params.communityId}`);
    const data = response.data.data;
    console.log(data);
    console.log(data.followingUsers);

    return (
        <div className='flex justify-center w-full h-full py-4'>

            <div className='flex flex-col items-center w-full h-full gap-8'>

                {/* Header */}

                <div className='w-full lg:w-[65%] rounded-xl h-[600px] pb-10 overflow-hidden flex flex-col justify-between'>

                    <div className='relative w-full h-1/2'>
                        <CommunityBanner url={data.bannerURL} />

                        <div className='absolute flex gap-8 -bottom-20 left-10'>

                            <div className='relative w-32 h-32 rounded-full'>
                                <CommunityLogo url={data.logoURL} />
                            </div>

                            <span className='self-end pb-4 text-2xl font-semibold'>{data.name}</span>

                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2'>

                        {/* Description */}
                        <div className='flex items-center justify-center w-full p-4 text-center'>
                            <span className='text-lg font-semibold leading-8'>{data.description}</span>
                        </div>

                        <div className='flex items-center self-end gap-8 px-4'>

                            <div className='flex flex-col justify-center'>
                                <span className=''>{data.followingUsers.length}</span>
                                <span className='text-sm font-light'>{data.followingUsers.length === 1 ? 'Member' : 'Members'}</span>
                            </div>

                            <div className='flex flex-col justify-center'>
                                <span className=''>{data.createdAt}</span>
                                <span className='text-xs font-light'>Created On</span>
                            </div>

                            <div>
                                <JoinCommunityButton communityId={data.communityId} />
                            </div>

                        </div>

                    </div>

                </div>

            </div>


        </div>
    )
}

export default page