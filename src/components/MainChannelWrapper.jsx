'use client';

import React from 'react';
import { Channel } from 'stream-chat-react';
import EmptyState from './EmptyState';
import { Message, TimeLine } from './Message';

const MainChannelWrapper = ({ children }) => {
    return (
        <Channel EmptyStateIndicator={EmptyState} DateSeparator={TimeLine} >
            {children}
        </Channel>
    )
}

export default MainChannelWrapper