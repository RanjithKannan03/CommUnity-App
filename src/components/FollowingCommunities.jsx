'use client';

import React, { useState, useEffect } from 'react';
import CommunitiesList from './CommunitiesList';
import ExpandCommunityList from './ExpandCommunityList';
import { userStore, communityListStore } from '@/zustand/store';
import axios from 'axios';

const FollowingCommunities = (props) => {

    const user = userStore((state) => state.user);
    const setFollowingCommunities = communityListStore((state) => state.setFollowingCommunities);
    const [communities, setCommunities] = useState([]);

    useEffect(() => {
        async function get() {
            await getCommunities();
        }
        get();
        const intervalId = setInterval(get, 10000);
        return () => clearInterval(intervalId);
    }, []);

    async function getCommunities() {
        const response = await axios.post('http://localhost:8000/followingCommunityDetails', { id: user.id }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.status != 200) {
            throw new Error("Please try again later.");
        }
        const data = response.data;
        const communities = data.communities;
        setFollowingCommunities(communities);
        setCommunities(communities);
    }


    return (
        <div className='flex flex-col w-full gap-2 h-2/3'>

            <ExpandCommunityList />

            <CommunitiesList communities={communities} />


        </div>
    )
}

export default FollowingCommunities