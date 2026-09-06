'use client';

import React from 'react';
import styles from './PostFeed.module.scss';
import { IPostList } from '@entities/post/model/types';
import { LoaderBase } from '@/shared';
import { PostCard, PostsNotFound } from '@entities/post';

const PostFeed: React.FC<IPostList> = ({ posts, isLoading }) => {

    if (!posts?.length) {
        return (
            <section className={styles['post-list']}>
                <PostsNotFound />
            </section>
        );
    }

    if (isLoading) {
        return (
            <section className={styles['post-list']}>
                <LoaderBase />
            </section>
        );
    }

    return (
        <section className={styles['post-list']}>
            {posts.map((item) => (
                <PostCard
                    key={item.id}
                    id={item.id}
                    author={item.author }
                    title={item.title}
                    textContent={item.textContent}
                    meta={item.meta}
                />
            ))}
        </section>
    );
};

export default PostFeed;