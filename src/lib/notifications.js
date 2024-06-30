'use client';

import axios from "axios";
import { update } from "./redirect";
import { userStore } from "@/zustand/store";

export async function deleteNotification(notificationId, path) {
    const data = {
        notificationId: notificationId
    };

    const response = await axios.post('http://localhost:8000/deleteNotification', { ...data }, {
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

export async function acceptRequest(notificationId, path) {
    const data = {
        notificationId: notificationId
    };

    const response = await axios.post('http://localhost:8000/acceptRequest', { ...data }, {
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