'use client';

import { Header, NavBar } from '@/widgets';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div className="layout">
                <NavBar />
                <main className="container">{children}</main>
            </div>
        </div>
    );
}
