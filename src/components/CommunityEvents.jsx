import React from 'react';
import Event from './Event';

const CommunityEvents = ({ events }) => {
    return (
        <div className="flex flex-col items-center w-full gap-6">


            {
                events.length > 0 ?
                    events.map((event) => {
                        return (
                            <Event key={event._id} id={event._id} name={event.userId.username} avatarURL={event.userId.avatarURL} time={new Date(event.createdAt)} title={event.title} description={event.description} attachmentURL={event.attachmentURL} numLikes={event.numLikes} likedUserIds={event.likedUserIds} />
                        )
                    })
                    :
                    <span>There currently no events held.</span>
            }


        </div>
    )
}

export default CommunityEvents