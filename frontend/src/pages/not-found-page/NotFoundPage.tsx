'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage: React.FC = () => {
    return (
        <main className="not-found">
            <h1 className="not-found__title">404</h1>
            <p className="not-found__text">Страница не найдена</p>
            <Link href={'/'} className="not-found__link">На главную</Link>
        </main>
    );
};

export default NotFoundPage;