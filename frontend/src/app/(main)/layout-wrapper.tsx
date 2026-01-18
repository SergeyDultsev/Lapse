'use client';

import { ReactQueryProvider } from '@/shared';
import { ThemeProvider } from "@/providers";
import { NavBar } from "@/widgets";
import "@/assets/css/global.scss";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <ReactQueryProvider>
            <ThemeProvider>
                <div className="layout">
                    <main className="container">{children}</main>
                    <NavBar />
                </div>
            </ThemeProvider>
        </ReactQueryProvider>
    );
}