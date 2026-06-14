'use client';

import React from 'react';

import { LoaderBase } from '@/shared';
import { PostList, usePostsUser } from '@/entities/post';

const FavoritePage: React.FC = () => {
    const { data, isPending } = usePostsUser('1');

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

export default FavoritePage;
