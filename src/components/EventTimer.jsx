'use client';

import React, { useState, useEffect } from 'react';

function EventTimer({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState('');

    useEffect(() => {
        const target = new Date(targetDate).getTime();

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = target - now;

            if (distance < 0) {
                clearInterval(timer);
                setTimeLeft('Completed');
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const formattedTime = `${String(days).padStart(2, '0')} : ${String(hours).padStart(2, '0')} : ${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;

            setTimeLeft(formattedTime);
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return <div className='text-3xl font-semibold'>{timeLeft}</div>;
}

export default EventTimer;
