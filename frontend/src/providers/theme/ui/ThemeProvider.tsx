'use client';

import React, {
    ReactNode,
    useEffect,
} from 'react';
import { useTheme } from '@/providers';
import { tTheme } from '@providers/theme/types/ITheme';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const theme: tTheme = useTheme();

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