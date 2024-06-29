'use client';

import React, { useOptimistic, useEffect, useState } from 'react';
import { userStore } from '@/zustand/store';
import { likePost, unlikePost } from '@/lib/post';
import { usePathname } from 'next/navigation';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import axios from 'axios';

const FeedPostLikeButton = (props) => {

    const [likedUserIds, setLikedUserIds] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8000/postLikes?postId=${props.id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (response.status !== 200) {
                    throw new Error("Please try again later.");
                } else {
                    setLikedUserIds(response.data.likedUserIds);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])

    const user = userStore((state) => state.user);
    const path = usePathname();
    const [optimisticLikedIds, updateOptimisticLikedIds] = useOptimistic(likedUserIds, (prevLikedIds, action) => {
        if (action === 'like') {
            return [...prevLikedIds, user.id];
        }
        else {
            return prevLikedIds.filter((id) => { return id != user.id });
        }
    });

    async function handleLike() {
        updateOptimisticLikedIds('like');
        await likePost(props.id, null);
        setLikedUserIds(prevLikedIds => [...prevLikedIds, user.id]);
    }

    async function handleUnlike() {
        updateOptimisticLikedIds('unlike');
        await unlikePost(props.id, null);
        setLikedUserIds(prevLikedIds => prevLikedIds.filter(id => id !== user.id));
    }

    return (
        <>
            {
                optimisticLikedIds.includes(user.id) ?
                    (
                        <form action={handleUnlike}>
                            <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                                <IoIosHeart size={20} />
                                <span>{optimisticLikedIds.length}</span>
                            </button>
                        </form>
                    )
                    :
                    (
                        <form action={handleLike}>
                            <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-full flex gap-2 items-center'>

                                <IoIosHeartEmpty size={20} />
                                <span>{optimisticLikedIds.length}</span>
                            </button>
                        </form>
                    )
            }
        </>
    )
}

export default FeedPostLikeButton