'use client';

import React, { useEffect, useState } from 'react';
import { userStore } from '@/zustand/store';
import axios from 'axios';
import { requestToSell } from '@/lib/store';
import { useRouter } from 'next/navigation';
import { sstore } from '@/zustand/store';

const MerchantRequest = ({ data, communityId }) => {
    const router = useRouter();
    const user = userStore((state) => state.user);
    const setCommunityId = sstore((state) => state.setCommunityId);

    const [status, setStatus] = useState();

    useEffect(() => {
        async function getStatus() {
            const response = await axios.get(`http://localhost:8000/requestStatus?communityId=${communityId}`, { withCredentials: true });
            if (response.status !== 200) {
                throw new Error("Please try again later.");
            } else {
                setStatus(response.data.status);
            }
        }

        if (!(data.adminId === user.id || data.merchantIds.includes(user.id))) {
            getStatus();
        }

    }, []);

    async function handleRequest() {
        setStatus("Pending");
        await requestToSell(communityId);
    }

    return (
        <div>
            {
                data.adminId != user.id ? data.merchantIds.includes(user.id) ?
                    <button className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white' onClick={() => {
                        setCommunityId(communityId);
                        router.push('/store/newItem');
                    }}>
                        <span>Sell</span>
                    </button>
                    :
                    <button className='flex items-center justify-center p-2 rounded-full ring-1 ring-black dark:ring-white' onClick={handleRequest}>

                        {
                            status === 'Pending' ?
                                <span>Request sent</span>
                                :
                                <span>Request to sell</span>
                        }

                    </button>
                    :
                    null
            }
        </div>
    )
}

export default MerchantRequest