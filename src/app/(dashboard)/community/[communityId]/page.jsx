import React from 'react';
import axios from 'axios';
import CommunityBanner from '@/components/CommunityBanner';
import CommunityLogo from '@/components/CommunityLogo';
import { JoinCommunityButton } from '@/components/JoinCommunityButton';
import Post from '@/components/Post';
import { faker } from '@faker-js/faker';


const page = async ({ params }) => {

    faker.seed(123);
    const response = await axios.get(`http://localhost:8000/community/${params.communityId}`);
    const data = response.data.data;
    const posts = data.posts;
    console.log(posts);
    // console.log(data);
    // console.log(data.followingUsers);

    // const posts = [
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //     },
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //         attachment: faker.image.url()
    //     },
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //     },
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //         attachment: faker.image.url()
    //     },
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //     },
    //     {
    //         name: faker.company.name(),
    //         avatarURL: faker.image.avatar(),
    //         time: faker.date.anytime(),
    //         title: faker.lorem.sentence(),
    //         text: faker.lorem.paragraph(),
    //         attachment: faker.image.url()
    //     },
    // ]

    return (
        <div className='flex justify-center w-full h-full py-4'>

            <div className='flex flex-col items-center w-full h-full gap-8 overflow-y-auto'>

                {/* Header */}

                <div className='w-full lg:w-[65%] rounded-xl h-[600px] pb-10 overflow-hidden flex flex-col justify-between shrink-0'>

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
                            <span className='text-lg font-semibold leading-8 line-clamp-4'>{data.description}</span>
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
                                <JoinCommunityButton communityId={data.communityId} adminId={data.adminId} />
                            </div>

                        </div>

                    </div>

                </div>

                {/* Posts */}


                <div className="flex flex-col items-center w-full gap-6">


                    {
                        posts.length > 0 ?
                            posts.map((post) => {
                                return (
                                    <Post key={post.title} id={post._id} name={post.userId.username} avatarURL={post.userId.avatarURL} time={new Date(post.createdAt).toDateString()} title={post.title} body={post.body} attachmentURL={post.attachmentURL} numLikes={post.numLikes} numComments={post.numComments} likedUserIds={post.likedUserIds} />
                                )
                            })
                            :
                            <span>There are no posts yet.</span>
                    }

                </div>
            </div>

        </div>



    )
}

export default page