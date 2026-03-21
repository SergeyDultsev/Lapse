import { create } from 'zustand/react';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
    IThemeStore,
    IInitialState,
    ITheme,
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
            const currentTheme = get().theme;
            let nextTheme: ITheme;

            if (currentTheme === 'system') {
                const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                nextTheme = systemDark ? 'light' : 'dark';
            } else {
                nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            }

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