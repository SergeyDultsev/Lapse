'use client';

import React from 'react';
import PostList from '@/entities/post/ui/post-list/PostList';
import { useQuery } from '@tanstack/react-query';
import { LoaderSpinner } from '@/shared';
import { IPost } from '@/entities/post/types';

const posts: IPost[] = [
    {
        id: '1',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Illidanchik',
            email: 'email@',
        },
        meta: {
            countLike: 12,
            countComment: 4,
            countView: 120,
        },
    },
    {
        id: '2',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Hui',
            email: 'email@',
        },
        meta: {
            countLike: 34,
            countComment: 42,
            countView: 123,
        },
    },
    {
        id: '3',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Hie',
            email: 'email@',
        },
        meta: {
            countLike: 123,
            countComment: 1000,
            countView: 1300,
        },
    },
];

const getPosts = () => {
    return new Promise<IPost[]>(resolve => {
        setTimeout(() => {
            resolve(posts);
        }, 1000);
    });
};

const FeedPage: React.FC = () => {

    const { data, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    });

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
