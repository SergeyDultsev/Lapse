import { AppHeader, NavBar } from '@/widgets';
import { globalConfig } from '@shared/configs/global.config';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <AppHeader />
            <div>
                <section className="container" style={{ maxWidth: `${globalConfig.containerWidth}px` }}>
                    <NavBar />
                    {children}
                </section>
            </div>
        </div>
    );
}
