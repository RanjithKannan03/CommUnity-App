import React from 'react';
import { getPost } from '@/lib/postPage';
import Image from 'next/image';
import PostLikeButton from '@/components/PostLikeButton';
import { RiShare2Line } from "react-icons/ri";
import { IoChatboxOutline } from "react-icons/io5";
import ImageWithLoader from '@/components/ImageWithLoader';
import NewCommentForm from '@/components/NewCommentForm';
import Comment from '@/components/Comment';
import PostUsername from '@/components/PostUsername';

const page = async ({ params }) => {
    const post = await getPost(params.postId);
    return (
        <div className='flex flex-col w-full h-screen py-10'>

            <div className='flex flex-col items-center w-full gap-8 pb-20'>
                {/* Post */}
                <div className='flex flex-col w-full lg:w-[65%] items-start p-3 rounded-xl gap-2 bg-[#D7F3FF] dark:bg-[#1F1F1F]'>

                    {/* Metadata */}

                    <div className='flex items-start w-full gap-2'>
                        <span>Posted To :</span>
                        <div className='relative w-5 h-5'>
                            <ImageWithLoader url={post.communityId.logoURL} />
                        </div>

                        <span className='text-sm text-black dark:text-white'>{post.communityId.name}</span>
                    </div>

                    <div className='flex items-center w-full gap-2'>

                        {/* OP Avatar */}

                        <div className='relative w-5 h-5'>
                            <ImageWithLoader url={post.userId.avatarURL} />
                        </div>

                        <PostUsername id={post.userId._id} username={post.userId.username} />

                        <div className='w-1 h-1 bg-black rounded-full dark:bg-white' />

                        <span className='text-sm text-black dark:text-white'>{new Date(post.createdAt).toLocaleString()}</span>

                    </div>

                    {/* Title */}

                    <span className='text-2xl font-semibold text-black dark:text-white'>{post.title}</span>

                    {/* Body */}
                    <span className='text-black dark:text-white'>{post.body}</span>

                    {/* Attachment */}
                    {
                        post.attachmentURL ?
                            (
                                <div className='w-full h-[40rem] relative bg-white dark:bg-black rounded-lg'>
                                    <Image src={post.attachmentURL} fill sizes='640' className='object-contain' alt='post image' priority />
                                </div>
                            )
                            :
                            null
                    }

                    <div className='flex items-center gap-4'>

                        <PostLikeButton likedUserIds={post.likedUserIds} id={post._id} />

                        <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                            <IoChatboxOutline size={20} />
                            <span>{post.commentIds.length}</span>
                        </button>

                        <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                            <RiShare2Line size={20} />
                            <span>share</span>
                        </button>

                    </div>

                </div>

                {/* New Comment Form */}
                <NewCommentForm postId={post._id} />

                {/* Comments */}

                <div className='flex flex-col w-full lg:w-[65%] gap-8 py-4'>

                    {post.commentIds.map((comment) => {
                        return (
                            <Comment key={comment._id} comment={comment} />
                        )
                    })}

                </div>
            </div>

        </div>
    )
}

export default page;
