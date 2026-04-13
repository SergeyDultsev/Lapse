'use client';

import { TanstackQueryProvider } from '@shared/setup';
import { ThemeProvider } from '@/providers';
import '@/assets/css/global.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <TanstackQueryProvider>
            <ThemeProvider>
                <div className="layout">
                    <main className="container">{children}</main>
                </div>
            </ThemeProvider>
        </TanstackQueryProvider>
    );
}