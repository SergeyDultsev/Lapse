'use client';

import React from 'react';
import styles from './PostFeed.module.scss';
import { IPostList } from '@entities/post/model/types';
import { LoaderBase } from '@/shared';
import { PostCard, PostsNotFound } from '@entities/post';
import Link from 'next/link';

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
                <Link href={`/post/${item.postId}`} target={'_blank'} key={item.postId}>
                    <PostCard
                        userId={item.userId}
                        postId={item.postId}
                        author={item.author}
                        title={item.title}
                        textContent={item.textContent}
                        meta={item.meta}
                    />
                </Link>
            ))}
        </section>
    );
};

export default PostFeed;