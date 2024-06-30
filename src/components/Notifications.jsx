'use client';

import React, { useState, useEffect, useOptimistic } from 'react';
import axios from 'axios';
import { GoBell } from "react-icons/go";
import { motion, AnimatePresence } from 'framer-motion';
import Notification from './Notification';
import { acceptRequest, deleteNotification } from '@/lib/notifications';
import { usePathname } from 'next/navigation';

const cardVariant = {
    close: {
        opacity: 0,
        scale: 0
    },
    open: {
        opacity: 1,
        scale: 1
    }
};

const Notifications = () => {
    const path = usePathname();
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/notifications', {
                    withCredentials: true
                });
                if (response.status !== 200) {
                    throw new Error("Please try again later.");
                } else {
                    setNotifications(response.data.notifications);
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
        const intervalId = setInterval(fetchData, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const [optimisticNotifications, updateOptimisticNotifications] = useOptimistic(notifications, (prevNotifications, id) => {
        return prevNotifications.filter((notification) => { return notification._id != id });
    });

    async function deleteNoti(id) {
        updateOptimisticNotifications(id);
        await deleteNotification(id, path);
        setNotifications((prev) => prev.filter((notification) => { return notification._id != id }));
    }

    async function accepetReq(id) {
        updateOptimisticNotifications(id);
        await acceptRequest(id, path);
        await deleteNotification(id, path);
        setNotifications((prev) => prev.filter((notification) => { return notification._id != id }));
    }

    return (
        <div className='relative' onClick={() => { setOpen((prev) => { return !prev }) }}>
            <div className='dark:text-white dark:hover:bg-[#FE686F] hover:bg-[#F5F8FA] text-black p-2 rounded-full cursor-pointer text-xl'>
                <GoBell size={32} />
            </div>

            <AnimatePresence>
                {
                    open &&
                    <motion.div variants={cardVariant} initial="close" animate="open" exit="close" className='origin-top-right absolute max-h-[400px] items-center w-[375px] lg:w-[550px] right-1/2 top-full z-30 flex flex-col gap-4 py-6 rounded shadow-xl drop-shadow-xl bg-white overflow-x-hidden overflow-y-auto' onClick={(e) => { e.stopPropagation() }}>
                        {
                            optimisticNotifications.length > 0 ?
                                <div className='flex flex-col items-center w-full gap-4 text-black'>
                                    {
                                        optimisticNotifications.map((notification) => {
                                            return (
                                                <Notification key={notification._id} notification={notification} deleteAction={deleteNoti} acceptAction={accepetReq} />
                                            )
                                        })
                                    }
                                </div>
                                :
                                <span className='text-black'>You have no notifications.</span>
                        }
                    </motion.div>

                }
            </AnimatePresence>
        </div>
    )
}

export default Notifications