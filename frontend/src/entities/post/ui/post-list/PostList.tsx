'use client';

import React from 'react';
import styles from './PostList.module.scss';
import PostItem from '@/entities/post/ui/post-item/PostItem';
import { IPost } from '@/entities/post/types';
import { useQuery } from '@tanstack/react-query';
import { LoaderSpinner } from '@/shared';

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

const PostList: React.FC<IPost> = () => {

    const { data, error, isPending } = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts, 
    });

    if (isPending) {
        return (
            <section className={styles['post-list']}>
                <LoaderSpinner />
            </section>
        );
    }

    if (error) {
        return (
            <section className={styles['post-list']}>
                <div>error: { JSON.stringify(error) }</div>
            </section>
        );
    }

    return (
        <section className={styles['post-list']}>
            {data.map((item) => (
                <PostItem
                    key={item.id}
                    author={item.author }
                    title={item.title}
                    body={item.body}
                    meta={item.meta}
                />
            ))}
        </section>
    );
};

export default PostList;