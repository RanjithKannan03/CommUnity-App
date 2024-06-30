import React from 'react'
import Participant from './Participant'

const ParticipantsList = ({ participants }) => {
    return (
        <div className='flex flex-col h-[25%] lg:h-[60%] w-full p-4 overflow-y-auto'>

            <div className='flex flex-col items-center w-full gap-2 p-4'>

                {
                    participants.map((participant) => {
                        return (
                            <div className='flex justify-between w-full'>
                                <Participant participant={participant} />
                            </div>
                        )
                    })
                }







            </div>

        </div>
    )
}

export default ParticipantsList