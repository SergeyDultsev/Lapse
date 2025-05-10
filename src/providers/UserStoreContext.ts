"use client";

import { createContext, useContext } from 'react';
import type { UserStore } from "@/entities/user/model/store/UserStore";

export const UserStoreContext = createContext<UserStore | null>(null);

export const useUserStore = () => {
    const store = useContext(UserStoreContext);
    if (!store) return null;
    return store;
};
