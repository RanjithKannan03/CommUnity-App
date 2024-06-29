import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set, get) => ({
            user: null,
            loginUser: (user) => set({ user: user }),
            logoutUser: () => set({ user: null })
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        },
    )
);

export const communityListStore = create(
    persist(
        (set, get) => ({
            open: false,
            toggle: () => set({ open: !get().open }),
            followingCommunities: null,
            setFollowingCommunities: (communities) => set({ followingCommunities: communities })
        }),
        {
            name: 'user-storage', // name of the item in the storage (must be unique)
            storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
);