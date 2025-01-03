'use client';

import axios from "axios";
import { userStore } from "@/zustand/store";
import { update } from "./redirect";
import { uploadImage, uploadImages } from "./cloudinary";

export async function createCommunity(prevState, formData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const banner = formData.get('banner');
    const logo = formData.get('logo');
    const state = userStore.getState();

    console.log(banner);
    console.log(logo);

    if (!name || name.trim().length === 0) {
        return { error: "Name of the community cannot be blank." }
    }
    if (!description || description.trim().length === 0) {
        return { error: "Description cannot be blank." }
    }
    if (banner.size == 0) {
        return { error: "Banner cannot be empty." }
    }
    if (logo.size == 0) {
        return { error: "Logo cannot be empty." }
    }

    // const bannerURL = await uploadImage(banner);
    // const logoURL = await uploadImage(logo);

    const imageURLs = await uploadImages(formData);

    const community = {
        bannerURL: imageURLs.bannerURL,
        logoURL: imageURLs.logoURL,
        name: name,
        description: description,
    };

    const response = await axios.post('http://localhost:8000/createCommunity', { ...community }, {
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
            state.loginUser(data.user);
            update('/');
        }
    }
}


export async function joinCommunity(communityId) {
    const data = {
        communityId: communityId
    };

    const state = userStore.getState();

    const response = await axios.post('http://localhost:8000/joinCommunity', { ...data }, {
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
            update(`/community/${communityId}`);
        }
    }
}

export async function leaveCommunity(communityId) {
    const data = {
        communityId: communityId
    };

    const state = userStore.getState();

    const response = await axios.post('http://localhost:8000/leaveCommunity', { ...data }, {
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
            update(`/community/${communityId}`);
        }
    }
}
