'use client';

import { userStore } from "@/zustand/store";

export function getUser() {
    'use client';
    const state = userStore.getState();

    return state.user;
}

export function loginUser(user) {
    'use client';
    const state = userStore.getState();
    state.loginUser(user);
}