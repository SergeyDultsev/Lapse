'use client'

import {
    ReactNode,
    useEffect,
} from "react";
import { useTheme, ITheme } from "shared";

export function ThemeProvider({ children }: { children: ReactNode }) {
    const theme: ITheme = useTheme();

    useEffect(() => {
        const currentTheme =
            theme === 'system'
                ? window.matchMedia('(prefers-color-scheme: dark)').matches
                    ? 'dark'
                    : 'light'
                : theme;

        document.documentElement.setAttribute('data-theme', currentTheme);
    }, [theme]);

    return <>{children}</>
}