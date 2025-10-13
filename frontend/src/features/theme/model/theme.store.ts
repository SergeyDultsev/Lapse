import { create } from "zustand/react";
import { ThemeStore } from '@shared/types/theme';

export const useThemeStore = create<ThemeStore>((set, get) => ({
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