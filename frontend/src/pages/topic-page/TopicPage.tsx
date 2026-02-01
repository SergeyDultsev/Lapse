'use client';

import React, { useEffect } from 'react';

import Topic from '@/entities/topic/ui/Topic';
import { ITopic } from '@/entities/topic/model/ITopic';
import { useTopicStore } from '@/entities/topic/model/topic.store';
import PostList from '@/entities/post/ui/post-list/PostList';
import { useQuery } from '@tanstack/react-query';
import styles from '@/entities/post/ui/post-list/PostList.module.scss';
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

const TopicPage: React.FC<ITopic> = ({
    id,
    title,
    description,
    countPosts,
    countReaders,
}) => {
    const storeTopic = useTopicStore();
    const setTopic = storeTopic.setTopic;

    useEffect(() => {
       setTopic({ id, title, description, countPosts, countReaders });
    }, [id, title, description, countPosts, countReaders]);

    const { data, isPending } = useQuery({
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
    
    if (!data) {
        return (
            <section className={styles['post-list']}>
                <div>Нет данных</div>
            </section>
        );
    }

    return (
        <main className="main">
            <Topic />
            <PostList posts={data} />
        </main>
    );
};

export default TopicPage;