'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedPost from './FeedPost';

const HomePosts = () => {

    const [posts, setPosts] = useState([]);


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8000/home', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                if (response.status !== 200) {
                    throw new Error("Please try again later.");
                } else {
                    setPosts(response.data.posts);
                }
            } catch (error) {
                console.error(error);
                // Handle error state here
            }
        }

        fetchData();
    }, [])

    return (
        <div className="flex flex-col items-center w-full gap-6 ">

            {
                posts.length > 0 ?
                    (
                        posts.map((post) => {
                            return (
                                <FeedPost key={post.title} id={post._id} name={post.userId.username} avatarURL={post.userId.avatarURL} time={new Date(post.createdAt)} title={post.title} body={post.body} attachmentURL={post.attachmentURL} numLikes={post.numLikes} numComments={post.numComments} commentIds={post.commentIds} />
                            )
                        })
                    )
                    :
                    <span>Your feed is empty.</span>
            }


        </div>
    )
}

export default HomePosts