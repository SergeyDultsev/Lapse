'use client';

import React from 'react';

import { LoaderBase } from '@/shared';
import { usePostsUser } from '@/entities/post/model/post.queries';
import PostList from '@/entities/post/ui/post-list/PostList';

const FavoritePage: React.FC = () => {
    const { data, isPending } = usePostsUser();

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
