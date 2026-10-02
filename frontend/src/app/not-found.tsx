import type { Metadata } from 'next';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
    title: '404',
    description: 'Страница 404',
};

export default function NotFound() {
    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link href={'/'} className="not-found__link">На главную</Link>
        </main>
    );
}