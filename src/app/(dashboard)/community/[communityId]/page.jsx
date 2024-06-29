import React from 'react'

const page = ({ params }) => {
    return (
        <div>{params.communityId}</div>
    )
}

export default page