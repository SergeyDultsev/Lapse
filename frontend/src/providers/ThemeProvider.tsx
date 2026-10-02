'use client';

import React, {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from 'react';
import { 
    tTheme, 
    THEME_STORAGE_KEY, 
} from '@shared/config/theme.config';

type ThemeContextValue = {
    theme: tTheme;
    setTheme: (newTheme: tTheme) => void;
    toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const isTheme = (value: unknown): value is tTheme => {
    return value === 'light'
        || value === 'dark'
        || value === 'system';
};

export const useTheme = () => {
    const theme = useContext(ThemeContext);
    if (!theme) {
        throw new Error('useTheme error');
    }
    return theme;
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState<tTheme>('system');
    const [isMounted, setIsMounted] = useState(false);

    const toggleTheme = () => {
        setTheme((prev) => {
            if (prev === 'dark') return 'light';
            if (prev === 'light') return 'dark';

            return window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'light'
                : 'dark';
        });
    };

    /**
     * Чтение темы
     */
    useEffect(() => {
        const storedTheme = localStorage.getItem(
            THEME_STORAGE_KEY
        );

        if (isTheme(storedTheme)) {
            setTheme(storedTheme);
        } else {
            localStorage.setItem(
                THEME_STORAGE_KEY,
                'system'
            );

            setTheme('system');
        }

        setIsMounted(true);
    }, []);

    /**
     * Сохранение темы
     */
    useEffect(() => {
        if (!isMounted) return;

        localStorage.setItem(
            THEME_STORAGE_KEY,
            theme
        );

        if (theme === 'system') {
            document.documentElement.removeAttribute('data-theme');
            return;
        }

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme, isMounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
