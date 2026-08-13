'use client';

import React from 'react';

import { PostList, usePostsUser } from '@/entities/post';
import { redirect } from 'next/navigation';

const FavoritePage: React.FC = () => {
    const { data, isPending } = usePostsUser('1');

    if (!data) {
        redirect('/not-found');
    }

    return (
        <main className="main">
            <PostList posts={data} isLoading={isPending} />
        </main>
    );
};

export default FavoritePage;
