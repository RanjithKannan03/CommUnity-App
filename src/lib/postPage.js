'use server';

import axios from 'axios';

export async function getPost(postId) {
    const response = await axios.get(`http://localhost:8000/post?postId=${postId}`);
    if (response.status != 200) {
        throw new Error("Please try again later.");
    }
    else {
        const data = response.data;
        if (data.message != 'success') {
            return { error: data.message }
        }
        else {
            return data.post;
        }
    }

}