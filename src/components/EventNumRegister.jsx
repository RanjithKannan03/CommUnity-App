'use client';

import React from 'react';
import { userStore } from '@/zustand/store';;

const EventNumRegister = ({ event }) => {
    const user = userStore((state) => state.user);
    return (
        <div className='w-full'>
            {
                event.communityId.adminId === user.id ?
                    (
                        <div className='flex flex-col w-full gap-2'>
                            <span className='text-2xl'>Participants:</span>

                            <span className='font-semibold'>{event.participatingUserids.length}</span>

                        </div>
                    )
                    :
                    (
                        <div className='flex flex-col w-full gap-2'>
                            <span className='text-2xl'>Total Registrations:</span>

                            <span className='font-semibold'>{event.participatingUserids.length}</span>

                        </div>
                    )
            }
        </div>
    )
}

export default EventNumRegister