'use client';

import React from 'react';
import { PostList, usePostsFeed } from '@/entities/post';
import { LoaderBase } from '@/shared';

const FeedPage: React.FC = () => {
    const { data, isPending } = usePostsFeed();

    if (isPending) {
        return (
            <section className="loader-spinner__block">
                <LoaderBase />
            </section>
        );
    }

    if (!data) {
        return (
            <section className="main">
                <div>Нет данных</div>
            </section>
        );
    }

    return (
        <main className="main">
            <PostList posts={data} />
        </main>
    );
};

export default FeedPage;
