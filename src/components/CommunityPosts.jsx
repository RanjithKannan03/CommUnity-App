import React from 'react';
import Post from '@/components/Post';

const CommunityPosts = ({ posts }) => {
    return (
        <div className="flex flex-col items-center w-full gap-6">


            {
                posts.length > 0 ?
                    posts.map((post) => {
                        return (
                            <Post key={post.title} id={post._id} name={post.userId.username} avatarURL={post.userId.avatarURL} time={new Date(post.createdAt)} title={post.title} body={post.body} attachmentURL={post.attachmentURL} numLikes={post.numLikes} numComments={post.numComments} likedUserIds={post.likedUserIds} commentIds={post.commentIds} />
                        )
                    })
                    :
                    <span>There are no posts yet.</span>
            }


        </div>
    )
}

export default CommunityPosts