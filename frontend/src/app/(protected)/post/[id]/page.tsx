import React, { Suspense } from 'react';
import { LoaderBase } from '@/shared';
import { getPostById, PostCard } from '@entities/post';
import { notFound } from 'next/navigation';
import PostPage from "@pages/post-page/ui/PostPage";

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
        <PostPage post={postData}></PostPage>
    );
}

export default async function Post({ params }: {
   params: Promise<{ id: string }>,
}) {
    const { id } = await params;

    return (
        <Suspense fallback={<LoaderBase />}>
            <PostContext id={id}/>
        </Suspense>
    );
}