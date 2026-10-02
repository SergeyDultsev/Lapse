import React, { Suspense } from 'react';
import UILoader from '@shared/ui/ui-loader/ui/UILoader';
import { getPostById } from '@modules/posts/api/getPostById';
import PostCard from '@modules/posts/components/post-card/PostCard';
import { notFound } from 'next/navigation';
import styles from './PostPage.module.scss';

export async function generateMetadata({ params }: {
    params: Promise<{ id: string }>,
}) {
    const { id } = await params;

    const post = await getPostById(id);

    return {
        title: post?.title || 'Заголовок поста',
        description: post?.textContent || 'Описание поста',
    };
}

async function PostContext ({ id }: { id: string }) {
    const postData = await getPostById(id);

    if (!postData) {
        notFound();
    }

    return (
        <main className="main">
            <section className={styles['post-detail']}>
                <PostCard
                    userId={postData.userId}
                    postId={postData.postId}
                    author={postData.author}
                    title={postData.title}
                    textContent={postData.textContent}
                    meta={postData.meta}
                />
            </section>
        </main>
    );
}

export default async function Post({ params }: {
   params: Promise<{ id: string }>,
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<UILoader />}>
            <PostContext id={id}/>
        </Suspense>
    );
}