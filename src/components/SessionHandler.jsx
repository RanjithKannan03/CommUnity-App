'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { userStore } from '@/zustand/store';


const SessionHandler = ({ children }) => {
    const loginUser = userStore((state) => state.loginUser);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkCookie() {
            const response = await axios.get('http://localhost:8000/isAuthenticated', { withCredentials: true });
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

    return (
        <>
            {children}
        </>
    )
}

export default SessionHandler