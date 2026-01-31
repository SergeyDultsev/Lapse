'use client';

import React, {
    ReactNode,
    useEffect,
} from 'react';
import { useTheme, ITheme } from 'shared';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
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

    return <>{children}</>;
};

export default ThemeProvider;