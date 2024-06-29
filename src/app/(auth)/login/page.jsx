'use client';

import React, { useState } from 'react';
import { IoEye, IoEyeOff } from "react-icons/io5";
import Link from 'next/link';
import AuthFormSubmitButton from '@/components/AuthFormSubmitButton';
import { useFormState } from 'react-dom';
import { login } from '@/lib/auth';
import logo from '../../../../public/assets/logo.png';
import Image from 'next/image';

const page = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [state, formAction] = useFormState(login, { error: null });
    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='flex w-full lg:w-[40%] xl:w-[30%] flex-col gap-4 p-4 text-black'>

                <div className='relative flex items-center self-center justify-center pb-2 w-44 h-44'>

                    <Image src={logo} fill sizes='176' className='object-contain' priority alt='logo' />

                </div>

                <span className="text-2xl font-semibold">Login to CommUnity</span>

                {state.error && <span>{state.error}</span>}

                <span className="">
                    New User?{" "}
                    <Link className="text-[#5B96F7]" href={"/register"}>
                        Create an account
                    </Link>
                </span>

                <form className='flex flex-col gap-4' action={formAction}>

                    <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
                        <input
                            type="text"
                            id="floating_outlined_email"
                            name="email"
                            className="peer w-full appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-0 dark:text-white"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_outlined_email"
                            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Email
                        </label>
                    </div>

                    <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            name="password"
                            autoComplete="off"
                            id="floating_outlined_pass"
                            className="peer flex-1 appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-0 dark:text-white"
                            placeholder=" "
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword((prev) => {
                                    return !prev;
                                });
                            }}
                        >
                            {showPassword ? <IoEye size={25} /> : <IoEyeOff size={25} />}
                        </button>
                        <label
                            htmlFor="floating_outlined_pass"
                            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Password
                        </label>
                    </div>

                    <AuthFormSubmitButton text="Sign In" />


                </form>


            </div>
        </div>
    )
}

export default page