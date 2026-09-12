'use client';

import QueryProvider from './query-provider/ui/QueryProvider';
import ThemeProvider from './theme-provider/ui/ThemeProvider';
import { ModalRoot } from '@shared/ui/modal';

const AppProviders = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryProvider>
            <ThemeProvider>
                <ModalRoot>
                    {children}
                </ModalRoot>
            </ThemeProvider>
        </QueryProvider>
    );
};

export default AppProviders;
