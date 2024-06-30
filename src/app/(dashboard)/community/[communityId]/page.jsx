import React from 'react';
import axios from 'axios';
import CommunityBanner from '@/components/CommunityBanner';
import CommunityLogo from '@/components/CommunityLogo';
import { JoinCommunityButton } from '@/components/JoinCommunityButton';
import DescriptionLimited from '@/components/DescriptionLimited';
import DescriptionFull from '@/components/DescriptionFull';
import CommunityPageContent from '@/components/CommunityPageContent';
import AdminActions from '@/components/AdminActions';
import MerchantRequest from '@/components/MerchantRequest';


const page = async ({ params }) => {

    const response = await axios.get(`http://localhost:8000/community/${params.communityId}`);
    const data = response.data.data;
    const posts = data.posts;
    console.log(posts);
    return (
        <div className='flex justify-center w-full h-full py-4'>

            <div className='flex flex-col items-center w-full h-full gap-8 overflow-y-auto'>

                {/* Header */}

                <div className='w-full lg:w-[65%] rounded-xl h-[600px] pb-10 overflow-hidden flex flex-col justify-between shrink-0'>

                    <div className='relative w-full h-1/2'>
                        <CommunityBanner url={data.bannerURL} />

                        <div className='absolute flex gap-8 top-[80%] left-10'>

                            <div className='relative rounded-full w-28 h-28 xl:w-32 xl:h-32'>
                                <CommunityLogo url={data.logoURL} />
                            </div>

                            <span className='self-end pb-4 text-lg font-semibold lg:text-xl xl:text-2xl'>{data.name}</span>

                        </div>
                    </div>

                    <div className='flex flex-col w-full gap-2 pt-10'>

                        {/* Description */}
                        <DescriptionLimited description={data.description} />

                        <div className='flex flex-col items-center self-end gap-8 px-4 lg:flex-row'>

                            <div className='flex items-center self-end gap-8'>
                                <div className='flex flex-col justify-center'>
                                    <span className=''>{data.followingUsers.length}</span>
                                    <span className='text-sm font-light'>{data.followingUsers.length === 1 ? 'Member' : 'Members'}</span>
                                </div>

                                <div className='flex flex-col justify-center'>
                                    <span className=''>{data.createdAt}</span>
                                    <span className='text-xs font-light'>Created On</span>
                                </div>
                            </div>


                            <div className='flex items-center self-end gap-8'>

                                <JoinCommunityButton communityId={data.communityId} adminId={data.adminId} />

                                <AdminActions adminId={data.adminId} communityId={params.communityId} />


                                <MerchantRequest data={data} communityId={params.communityId} />
                            </div>


                        </div>

                    </div>

                </div>

                {/* Content */}

                <CommunityPageContent posts={data.posts} events={data.events} items={data.items} />


            </div>

            <DescriptionFull description={data.description} />

        </div>



    )
}

export default page