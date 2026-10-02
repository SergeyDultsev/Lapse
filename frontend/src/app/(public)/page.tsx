import type { Metadata } from 'next';
import React from 'react';
import styles from '@modules/posts/components/post-feed/PostFeed.module.scss';
import Link from 'next/link';
import { IPost } from '@modules/posts/model/types';
import PostCard from '@modules/posts/components/post-card/PostCard';
import PostsNotFound from '@modules/posts/components/posts-not-found/PostsNotFound';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export default function Home() {
    const posts: IPost[] = [];

    if (!posts?.length) {
        return (
            <main className="main">
                <section className={styles['post-list']}>
                    <PostsNotFound />
                </section>
            </main>
        );
    }

    return (
        <main className="main">
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
        </main>
    );
}
