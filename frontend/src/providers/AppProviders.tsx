'use client';

import { QueryProvider } from './QueryProvider';
import { ThemeProvider } from './ThemeProvider';
import { ModalProvider } from './ModalProvider';
import { AuthFailureWatcher } from './AuthFailureWatcher';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <ThemeProvider>
                <ModalProvider>
                    <AuthFailureWatcher />
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </QueryProvider>
    );
};

export default AppProviders;
