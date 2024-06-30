'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userStore } from '@/zustand/store';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';

const apiKey = 'rfesnudz9jpe';

const ChatSessionHandler = ({ children }) => {
    const loginUser = userStore((state) => state.loginUser);
    const [isLoading, setIsLoading] = useState(true);
    const client = StreamChat.getInstance(apiKey);

    const user = userStore((state) => state.user);

    useEffect(() => {
        async function checkCookie() {
            const response = await axios.get('http://localhost:8000/isAuthenticatedChat', { withCredentials: true });
            return response.data;
        }

        async function authenticate() {
            const result = await checkCookie();
            if (result.message) {
                loginUser(result.user);
                setIsLoading(false);
            }
            else {
                window.location.href = 'http://localhost:3000/login';
            }
        }
        authenticate();

    }, [])

    if (isLoading) {
        return <div className='w-screen h-screen bg-white' />
    }

    if (!isLoading) {
        client.connectUser({
            id: user.id,
            name: user.username,
            avatarURL: user.avatarURL,
            status: user.status,
        }, user.token);
    }

    return (
        <Chat client={client}>
            {children}
        </Chat>
    )
}

export default ChatSessionHandler