import { create } from "zustand/react";
import { IThemeStore } from '@/shared/types/ITheme';

export const useThemeStore = create<IThemeStore>((set, get) => ({
    theme: 'light',
    setTheme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        set({theme});
    },
    toggleTheme: () => {
        const currentTheme = get().theme;
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', nextTheme);
        localStorage.setItem('theme', nextTheme);
        set({theme: nextTheme});
    },
}));