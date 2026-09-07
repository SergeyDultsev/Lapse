'use client';

import React from 'react';
import styles from './PostPage.module.scss';
import { IPost, PostCard } from '@entities/post';

interface IPostPage {
    post: IPost;
}

const PostPage: React.FC<IPostPage> = ({ post }) => {
    return (
        <main className="main">
            <section className={styles['post-detail']}>
                <PostCard
                    userId={post.userId}
                    postId={post.postId}
                    author={post.author}
                    title={post.title}
                    textContent={post.textContent}
                    meta={post.meta}
                />
            </section>
        </main>
    );
};

export default PostPage;
