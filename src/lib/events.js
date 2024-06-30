'use client';

import axios from "axios";
import { update } from "./redirect";
import { uploadImagesPost } from "./cloudinary";
import { userStore } from "@/zustand/store";

export async function createEvent(prevState, formData) {
    const title = formData.get('title');
    const description = formData.get('description');
    const communityId = formData.get('communityId');
    const attachment = formData.get('attachment');
    const eventDate = formData.get('eventDate');
    const lastDate = formData.get('lastDate');

    if (!eventDate || eventDate.trim().length == 0) {
        return { error: "Choose the date of event" }
    }

    if (!title || title.trim().length === 0) {
        return { error: "Title cannot be empty" }
    }

    if (!description || description.trim().length === 0) {
        return { error: "Description cannot be empty" }
    }

    const event = {
        title: title,
        description: description,
        communityId: communityId,
        eventDate: eventDate,
        lastDate: lastDate
    };

    if (attachment.size != 0) {
        const attachmentURL = await uploadImagesPost(formData);
        post.attachmentURL = attachmentURL;
    }

    const response = await axios.post('http://localhost:8000/createEvent', { ...event }, {
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

export async function likeEvent(eventId, path) {
    const data = {
        eventId: eventId
    };
    const state = userStore.getState();
    const response = await axios.post('http://localhost:8000/likeEvent', { ...data }, {
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
            update(path);
        }
    }
}

export async function unlikeEvent(eventId, path) {
    const data = {
        eventId: eventId
    };
    const state = userStore.getState();
    const response = await axios.post('http://localhost:8000/unlikeEvent', { ...data }, {
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
            update(path);
        }
    }
}

export async function registerEvent(eventId, path) {
    const data = {
        eventId: eventId
    };
    console.log(data);
    console.log("Hello");
    const state = userStore.getState();
    const response = await axios.post('http://localhost:8000/registerEvent', { ...data }, {
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