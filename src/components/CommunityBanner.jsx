'use client';

import React from 'react';
import Image from 'next/image';

function bannerLoader(config) {
    const urlStart = config.src.split('upload/')[0];
    const urlEnd = config.src.split('upload/')[1];
    const transformations = `w_500,q_${config.quality}`;
    return `${urlStart}upload/${transformations}/${urlEnd}`;
}

const CommunityBanner = (props) => {
    return (
        <Image src={props.url} fill className='object-cover' alt='banner' loader={bannerLoader} quality={75} priority />
    )
}

export default CommunityBanner