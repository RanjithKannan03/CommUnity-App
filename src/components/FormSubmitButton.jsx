'use client';

import React from 'react';
import { useFormStatus } from 'react-dom';

const FormSubmitButton = (props) => {
    const status = useFormStatus();

    if (status.pending) {
        return <p>loading...</p>
    }

    return (
        <button className='w-full p-3 rounded-lg text-black dark:text-white bg-[#99E2FF] dark:bg-[#FE686F] text-lg'>
            {props.text}
        </button>
    )
}

export default FormSubmitButton