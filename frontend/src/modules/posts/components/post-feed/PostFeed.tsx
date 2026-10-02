'use client';

import React from 'react';
import styles from './PostFeed.module.scss';
import Link from 'next/link';
import PostCard from '@modules/posts/components/post-card/PostCard';
import PostsNotFound from '@modules/posts/components/posts-not-found/PostsNotFound';
import { IPost } from '@modules/posts/model/types';

interface IPostFeedProps {
    posts: IPost[];
}

const PostFeed: React.FC<IPostFeedProps> = ({ posts }) => {

    if (!posts?.length) {
        return (
            <section className={styles['post-list']}>
                <PostsNotFound />
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