'use client';

import { Header, NavBar } from '@/widgets';
import { globalConfig } from '@shared/configs/global.config';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Header />
            <div>
                <section className="container" style={{ maxWidth: `${globalConfig.containerWidth}px` }}>
                    <NavBar />
                    {children}
                </section>
            </div>
        </div>
    );
}
