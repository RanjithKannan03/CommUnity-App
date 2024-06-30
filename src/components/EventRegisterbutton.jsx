'use client';

import React, { useOptimistic } from 'react';
import { userStore } from '@/zustand/store';
import { usePathname } from 'next/navigation';
import { registerEvent } from '@/lib/events';


const EventRegisterbutton = (props) => {

    const user = userStore((state) => state.user);
    const path = usePathname();
    const [optimisticParticipants, updateOptimisticParticipants] = useOptimistic(props.participatingUserIds, (prevParticipants) => {
        return [...prevParticipants, user.id];
    });

    async function handleRegister() {
        updateOptimisticParticipants();
        await registerEvent(props.id, path);
        props.setParticipatingUsers(prevParticipants => [...prevParticipants, user.id])
    }

    return (
        <>
            {
                optimisticParticipants.includes(user.id) ?
                    (

                        <div className='bg-white dark:bg-[#141414] ring-1 ring-black dark:ring-white text-black dark:text-white p-2 rounded-xl w-full flex gap-2 items-center'>

                            <span className='w-full text-2xl font-semibold text-center'>Registerd</span>
                        </div>

                    )
                    :

                    (
                        <form action={handleRegister} className='w-full'>
                            <button className='bg-[#99E2FF] dark:bg-[#AF1B34] text-black dark:text-white p-2 rounded-xl w-full flex gap-2 items-center'>
                                <span className='w-full text-2xl font-semibold text-center'>Register</span>
                            </button>
                        </form>
                    )
            }
        </>
    )
}

export default EventRegisterbutton