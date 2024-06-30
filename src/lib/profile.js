'use client';

import { uploadImagesPost } from "./cloudinary";
import { loginUser } from "./user";
import axios from 'axios';
import { update } from "./redirect";

export async function editAvatr(formData) {
    const avatarURL = await uploadImagesPost(formData);

    const data = {
        avatarURL: avatarURL
    };

    const response = await axios.post('http://localhost:8000/editAvatar', { ...data }, {
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
            loginUser(data.user);
            update(`/profile/myProfile`);
        }
    }
}