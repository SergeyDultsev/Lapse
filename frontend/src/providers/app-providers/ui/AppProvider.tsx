'use client';

import { TanstackQueryProvider } from '@shared/setup';
import { ModalProvider, ThemeProvider } from '@/providers';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <TanstackQueryProvider>
            <ThemeProvider>
                <ModalProvider>
                    {children}
                </ModalProvider>
            </ThemeProvider>
        </TanstackQueryProvider>
    );
};

export default AppProviders;