'use client';

import React, { useOptimistic } from 'react';
import { userStore } from '@/zustand/store';
import { joinCommunity, leaveCommunity } from '@/lib/community';

export const JoinCommunityButton = (props) => {
    const user = userStore((state) => state.user);
    const [optimisticCommunityIds, updateOptimisticCommunityIds] = useOptimistic(user.followingCommunityIDs, (prevCommunityIds, communityId, action) => {
        if (action === 'join') {
            return [...prevCommunityIds, communityId];
        }
        else {
            return prevCommunityIds.filter(id => id !== communityId);
        }
    });

    async function handleJoin() {
        updateOptimisticCommunityIds(props.communityId, 'join');
        await joinCommunity(props.communityId);
    }

    async function handleLeave() {
        updateOptimisticCommunityIds(props.communityId, 'leave');
        await leaveCommunity(props.communityId);
    }

    return (
        <>
            {
                props.adminId === user.id ?
                    <div className='flex items-center justify-center p-2 text-center rounded-full ring-1 ring-black dark:ring-white'>

                        <span>You are the admin</span>

                    </div>
                    :
                    (
                        optimisticCommunityIds.includes(props.communityId) ? (
                            <form className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white' action={handleLeave}>

                                <button type='submit'>Joined</button>

                            </form>)
                            :
                            (
                                <form className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white' action={handleJoin}>

                                    <button type='submit'>Join</button>

                                </form>
                            )
                    )
            }
        </>

    )
}

