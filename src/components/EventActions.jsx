'use client';

import React, { useState, useEffect } from 'react';
import { userStore } from '@/zustand/store';
import EventRegisterbutton from '@/components/EventRegisterbutton';
import axios from 'axios';
import ParticipantsList from './ParticipantsList';

const EventActions = ({ event }) => {
    const user = userStore((state) => state.user);
    const [participatingUsers, setParticipatingUsers] = useState([]);
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(`http://localhost:8000/eventParticipants?eventId=${event._id}`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (response.status !== 200) {
                    throw new Error("Please try again later.");
                } else {
                    setParticipatingUsers(response.data.data);
                    console.log(response.data.data);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [])
    return (
        <div className={`w-full ${event.communityId.adminId === user.id ? 'flex flex-1' : null}`}>
            {
                event.communityId.adminId === user.id ?
                    <ParticipantsList participants={event.participatingUserids} />
                    :
                    <EventRegisterbutton participatingUserIds={participatingUsers} id={event._id} setParticipatingUsers={setParticipatingUsers} />
            }
        </div>
    )
}

export default EventActions