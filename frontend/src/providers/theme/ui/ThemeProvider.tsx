'use client';

import React, {
    ReactNode,
    useEffect,
} from 'react';
import { useTheme, ITheme } from '@/providers';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme: ITheme = useTheme();

    useEffect(() => {
        if (theme === 'system') {
            document.documentElement.removeAttribute('data-theme');
            return;
        }

        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return <>{children}</>;
};

export default ThemeProvider;