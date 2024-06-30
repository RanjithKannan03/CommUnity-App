'use client';

import axios from "axios";
import { update } from "./redirect";
import { uploadImagesPost } from "./cloudinary";


export async function requestToSell(communityId) {
    const data = {
        communityId: communityId
    };

    const response = await axios.post('http://localhost:8000/request', { ...data }, {
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

export async function createItem(perevState, formData) {
    const name = formData.get('name');
    const description = formData.get('description');
    const price = formData.get('price');
    const attachment = formData.get('attachment');
    const communityId = formData.get('communityId');
    if (!name || name.trim().length === 0) {
        return { error: "Name cannot be blank." }
    }
    if (!description || description.trim().length === 0) {
        return { error: "Description cannot be blank." }
    }
    if (!price || price.trim().length === 0) {
        return { error: "Description cannot be blank." }
    }
    if (attachment.size == 0) {
        return { error: "Image cannot be empty." }
    }
    const attachmentURL = await uploadImagesPost(formData);

    const item = {
        name: name,
        description: description,
        communityId: communityId,
        price: price,
        attachmentURL: attachmentURL
    };

    const response = await axios.post('http://localhost:8000/createItem', { ...item }, {
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