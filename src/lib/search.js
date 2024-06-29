'use server';

import axios from 'axios';

export async function search(query) {
    const response = await axios.get(`http://localhost:8000/search?q=${query}`);

    if (response.status != 200) {
        throw new Error("Please try again later.");
    }
    else {
        const data = response.data;
        return data.result;
    }
}