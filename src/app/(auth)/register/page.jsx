'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FormSubmitButton from '@/components/FormSubmitButton';
import { useFormState } from 'react-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { register } from '@/lib/auth';

const page = () => {
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [state, formAction] = useFormState(register, { error: null });
    return (
        <div className='flex items-center justify-center w-full h-full'>

            <div className='flex w-[30%] flex-col gap-4 p-4 text-black'>



                <span className='text-2xl font-semibold'>Get Started With CommUnity</span>

                {state.error && <span>{state.error}</span>}

                <span className=''>Already have an account? <Link className='text-[#5B96F7] ' href={'/login'}>Sign in</Link></span>


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

                    <div className="relative items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
                        <input
                            type="text"
                            id="floating_outlined_username"
                            name="username"
                            className="peer w-full appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-0 dark:text-white"
                            placeholder=" "
                        />
                        <label
                            htmlFor="floating_outlined_username"
                            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Username
                        </label>
                    </div>

                    <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
                        <input
                            type={`${showPassword1 ? "text" : "password"}`}
                            name="password"
                            autoComplete="off"
                            id="floating_outlined_pass"
                            className="peer flex-1 appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-0 dark:text-white"
                            placeholder=" "
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword1((prev) => {
                                    return !prev;
                                });
                            }}
                        >
                            {showPassword1 ? <IoEye size={25} /> : <IoEyeOff size={25} />}
                        </button>
                        <label
                            htmlFor="floating_outlined_pass"
                            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Password
                        </label>
                    </div>

                    <div className="relative flex items-center w-full px-2 py-1 border border-gray-200 rounded-md 0 focus-within:ring-1 focus-within:ring-black">
                        <input
                            type={`${showPassword2 ? "text" : "password"}`}
                            name="confirmPassword"
                            autoComplete="off"
                            id="floating_outlined_pass_confirm"
                            className="peer flex-1 appearance-none bg-transparent px-2.5 pb-2.5 pt-4 text-sm text-gray-900 focus:outline-0 dark:text-white"
                            placeholder=" "
                        />
                        <button
                            type="button"
                            onClick={() => {
                                setShowPassword2((prev) => {
                                    return !prev;
                                });
                            }}
                        >
                            {showPassword2 ? <IoEye size={25} /> : <IoEyeOff size={25} />}
                        </button>
                        <label
                            htmlFor="floating_outlined_pass_confirm"
                            className="absolute start-1 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-black rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:bg-gray-900 dark:text-gray-400 peer-focus:dark:text-blue-500"
                        >
                            Confirm Password
                        </label>
                    </div>

                    <FormSubmitButton text="Register" />


                </form>


            </div>
        </div>
    )
}

export default page