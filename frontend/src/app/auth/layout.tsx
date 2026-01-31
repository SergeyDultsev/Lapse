'use client';

import { ReactQueryProvider } from '@/providers';
import { ThemeProvider } from '@/providers';
import '@/assets/css/global.scss';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <div className="layout">
                    <main className="container">{children}</main>
                </div>
            </ThemeProvider>
        </ReactQueryProvider>
    );
}