'use client';

import React from 'react';
import { userStore } from '@/zustand/store';
import Link from 'next/link';
import { eventStore } from '@/zustand/store';
import { useRouter } from 'next/navigation';

const AdminActions = ({ adminId, communityId }) => {
    const user = userStore((state) => state.user);
    const router = useRouter();
    const setCommunityId = eventStore((state) => state.setCommunityId);
    return (
        <>
            {
                adminId === user.id
                    ?
                    <div className='flex items-center gap-8'>
                        <div className='flex items-center justify-center p-2 rounded-full cursor-pointer ring-1 ring-black dark:ring-white' onClick={() => {
                            setCommunityId(communityId);
                            router.push('/event/newEvent');
                        }}>

                            <span>Create Event</span>

                        </div>
                        <button className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white'>

                            <span>Create Volunteer Event</span>

                        </button>
                    </div>
                    :
                    null
            }
        </>
    )
}

export default AdminActions