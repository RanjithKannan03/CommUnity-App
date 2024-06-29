'use client';

import React, { useOptimistic } from 'react';
import { userStore } from '@/zustand/store';
import { joinCommunity } from '@/lib/community';

export const JoinCommunityButton = (props) => {
    const user = userStore((state) => state.user);
    const [optimisticCommunityIds, updateOptimisticCommunityIds] = useOptimistic(user.followingCommunityIDs, (prevCommunityIds, communityId) => {
        return [...prevCommunityIds, communityId];
    });

    async function handleJoin() {
        updateOptimisticCommunityIds(props.communityId);
        await joinCommunity(props.communityId);
    }

    return (
        <>
            {
                optimisticCommunityIds.includes(props.communityId) ? (
                    <div className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white'>

                        <span>Joined</span>

                    </div>)
                    :
                    (
                        <form className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white' action={handleJoin}>

                            <button type='submit'>Join</button>

                        </form>
                    )
            }
        </>

    )
}

