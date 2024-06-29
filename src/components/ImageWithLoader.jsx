'use client';

import React from 'react';
import Image from 'next/image';


const ImageWithLoader = (props) => {
    function imageLoader(config) {
        const urlStart = config.src.split('upload/')[0];
        const urlEnd = config.src.split('upload/')[1];
        const transformations = `w_80,q_${config.quality}`;
        return `${urlStart}upload/${transformations}/${urlEnd}`;
    }
    return (
        <>
            {
                props.url === "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg" ?
                    (
                        <Image src={props.url} fill sizes='20' className='object-cover rounded-full' alt='community avatar' />
                    )
                    :
                    (
                        <Image src={props.url} fill sizes='20' className='object-cover rounded-full' alt='community avatar' loader={imageLoader} quality={50} />
                    )
            }
        </>
    )
}

export default ImageWithLoader