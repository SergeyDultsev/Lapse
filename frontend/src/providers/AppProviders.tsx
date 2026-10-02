'use client';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <ThemeProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </QueryProvider>
    );
};

export default AppProviders;
