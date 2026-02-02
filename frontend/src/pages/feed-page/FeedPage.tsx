'use client';

import React from 'react';
import PostList from '@/entities/post/ui/post-list/PostList';
import { LoaderSpinner } from '@/shared';
import { usePostsFeed } from '@/entities/post/model/post.queries';

const FeedPage: React.FC = () => {
    const { data, isPending } = usePostsFeed();

    if (isPending) {
        return (
            <section className="main">
                <LoaderSpinner />
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
