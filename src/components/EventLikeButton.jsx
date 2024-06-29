'use client';

import React, { useOptimistic } from 'react';
import { userStore } from '@/zustand/store';
import { likeEvent, unlikeEvent } from '@/lib/events';
import { usePathname } from 'next/navigation';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";

const EventLikeButton = (props) => {
    const user = userStore((state) => state.user);
    const path = usePathname();
    const [optimisticLikedIds, updateOptimisticLikedIds] = useOptimistic(props.likedUserIds, (prevLikedIds, action) => {
        if (action === 'like') {
            return [...prevLikedIds, user.id];
        }
        else {
            return prevLikedIds.filter((id) => { return id != user.id });
        }
    });

    async function handleLike() {
        updateOptimisticLikedIds('like');
        await likeEvent(props.id, path);
    }

    async function handleUnlike() {
        updateOptimisticLikedIds('unlike');
        await unlikeEvent(props.id, path);
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

export default EventLikeButton