'use client';

import React from 'react';
import Image from 'next/image';

function logoLoader(config) {
    const urlStart = config.src.split('upload/')[0];
    const urlEnd = config.src.split('upload/')[1];
    const transformations = `w_400,q_${config.quality}`;
    return `${urlStart}upload/${transformations}/${urlEnd}`;
}

const CommunityLogo = (props) => {
    return (
        <Image src={props.url} fill sizes='128' alt='logo' className='object-cover rounded-full' loader={logoLoader} quality={100} priority />
    )
}

export default CommunityLogo