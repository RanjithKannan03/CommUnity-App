'use client';

import React from 'react';
import { useTheme } from "next-themes";
import { motion } from 'framer-motion';
import { FaMoon } from "react-icons/fa";

const ToggleDark = () => {
    const { setTheme, resolvedTheme } = useTheme();
    return (
        <div className='flex items-center justify-between w-full px-4 py-2'>

            <div className='flex gap-4 text-black'>

                <FaMoon size={27} weight='light' />
                <span>Dark Mode</span>

            </div>

            <div className={`w-16 h-8 bg-[#5B96F7] dark:bg-[#B43638] p-2 rounded-full flex items-center ${resolvedTheme === 'dark' ? 'justify-end' : 'justify-start'}`}>

                <motion.button layout className='w-6 h-6 bg-white rounded-full' type='button' onClick={() => { setTheme(() => { return resolvedTheme === 'light' ? 'dark' : 'light' }) }} />

            </div>

        </div>
    )
}

export default ToggleDark