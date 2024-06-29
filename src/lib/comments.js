'use client';

import axios from "axios";
import { reload } from "./redirect";

export async function createComment(prevState, formData) {
    const text = formData.get('comment');
    const postId = formData.get('postId');

    const comment = {
        text: text,
        postId: postId
    };
    const response = await axios.post('http://localhost:8000/createComment', { ...comment }, {
        headers: {
            'Content-Type': 'application/json'
        },
        withCredentials: true
    });
    if (response.status != 200) {
        throw new Error("Please try again later.");
    }
    else {
        const data = response.data;
        if (data.message != 'success') {
            return { error: data.message }
        }
        else {
            reload(`/post/${postId}`);
        }
    }
}