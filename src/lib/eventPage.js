'use server';

import axios from 'axios';

export async function getEvent(eventId) {
    const response = await axios.get(`http://localhost:8000/event?eventId=${eventId}`);
    if (response.status != 200) {
        throw new Error("Please try again later.");
    }
    else {
        const data = response.data;
        if (data.message != 'success') {
            return { error: data.message }
        }
        else {
            return data.event;
        }
    }
}