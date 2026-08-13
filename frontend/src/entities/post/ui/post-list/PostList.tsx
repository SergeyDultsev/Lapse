'use client';

import React from 'react';
import styles from './PostList.module.scss';
import { IPostList } from '@/entities/post/model/types';
import { LoaderBase } from '@/shared';
import { PostItem } from '@entities/post';

const PostList: React.FC<IPostList> = ({ posts, isLoading }) => {

    if (!posts?.length) {
        return (
            <section className={styles['post-list']}>
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
                <PostItem
                    key={item.id}
                    id={item.id}
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