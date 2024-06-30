'use client';

import React, { useEffect, useState } from 'react';
import { userStore } from '@/zustand/store';

const List = ({ children, error = false, loading }) => {

    const user = userStore(state => state.user);




    if (error) {
        return (
            <div className={`flex flex-col w-full h-full`}>
                <p>Connection error, please wait a moment and try again.</p>
            </div>
        )
    }

    if (loading) {
        return (
            <div className={`flex flex-col w-full h-full`}>
                <p className="team-channel-list__message loading">
                    Messages loading...
                </p>
            </div>
        )
    }



    return (
        <div className={`flex flex-col gap-2 w-full h-full`}>
            <span> All Messages</span>

            <div className="flex flex-1 w-full py-2 overflow-y-auto">

                <div className="flex flex-col w-full gap-4 pb-2 pr-2">
                    {children}

                </div>

            </div>

        </div>
    )
}

export default List