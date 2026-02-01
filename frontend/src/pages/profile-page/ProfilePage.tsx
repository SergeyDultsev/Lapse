'use client';

import React from 'react';

import Profile from '@/widgets/profile/Profile';
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
            username: 'Serejka',
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
            username: 'Serejka',
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
            username: 'Serejka',
            email: 'email@',
        },
        meta: {
            countLike: 23,
            countComment: 1,
            countView: 130,
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

const ProfilePage: React.FC = () => {

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
            <Profile />
            <PostList posts={data} />
        </main>
    );
};

export default ProfilePage;