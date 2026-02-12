import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    IThemeStore,
    IInitialState,
} from '@providers/theme/types/ITheme';
import { type StateCreator } from 'zustand';

const initialState: IInitialState = {
    theme: 'system',
};

const themeStore: StateCreator<IThemeStore> = (set, get) => ({
        ...initialState,
        setTheme: (theme) => {
            set({ theme });
        },
        toggleTheme: () => {
            const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
            set({ theme: nextTheme });
        },
    }
);

export const useThemeStore = create<IThemeStore>()(
    persist(themeStore, {
        name: 'theme-storage',
        storage: createJSONStorage(() => localStorage),
    })
);

export const useTheme = () => useThemeStore(state => state.theme);
export const useSetTheme = () => useThemeStore(state => state.setTheme);
export const useToggleTheme = () => useThemeStore(state => state.toggleTheme);