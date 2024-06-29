'use client';

import axios from "axios";
import { update } from "./redirect";
import { uploadImagesPost } from "./cloudinary";
import { userStore } from "@/zustand/store";

export async function createPost(prevState, formData) {
    console.log(formData.get('attachment').size === 0);

    const title = formData.get('title');
    const body = formData.get('body');
    const communityId = formData.get('communityId');
    const attachment = formData.get('attachment');

    if (!communityId || communityId.trim().length == 0) {
        return { error: "You must choose a community" }
    }

    if (!title || title.trim().length === 0) {
        return { error: "Title cannot be empty" }
    }

    if (!body || body.trim().length === 0) {
        return { error: "Body cannot be empty" }
    }

    const post = {
        title: title,
        body: body,
        communityId: communityId
    }

    if (attachment.size != 0) {
        const attachmentURL = await uploadImagesPost(formData);
        post.attachmentURL = attachmentURL;
    }

    const response = await axios.post('http://localhost:8000/createPost', { ...post }, {
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
            update(`/community/${communityId}`);
        }
    }
}

export async function likePost(postId, path) {
    const data = {
        postId: postId
    };
    const state = userStore.getState();
    const response = await axios.post('http://localhost:8000/likePost', { ...data }, {
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
            console.log(data);
            state.loginUser(data.user);
            update(path);
        }
    }
}

export async function unlikePost(postId, path) {
    const data = {
        postId: postId
    };
    const state = userStore.getState();
    const response = await axios.post('http://localhost:8000/unlikePost', { ...data }, {
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
            console.log(data);
            state.loginUser(data.user);
            update(path);
        }
    }
}