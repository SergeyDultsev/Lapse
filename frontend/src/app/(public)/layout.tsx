import { AppHeader } from '@widgets/app-header';
import { NavBar } from '@widgets/nav-bar';
import { globalConfig } from '@shared/config/global.config';
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
