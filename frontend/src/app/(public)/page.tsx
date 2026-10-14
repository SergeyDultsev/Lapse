import type { Metadata } from 'next';
import React from 'react';
import PostFeed from '@modules/posts/components/post-feed/PostFeed';
import { IPost } from '@modules/posts/model/types';

export const dynamic = 'force-dynamic';

const SERVER_API_URL = process.env.API_URL || 'http://localhost:3000';

async function getPosts(): Promise<IPost[]> {
    try {
        const response = await fetch(`${SERVER_API_URL}/posts`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return [];
        }

        const responseData = await response.json();
        return responseData.data ?? [];
    } catch (error) {
        console.error('Failed to load posts:', error);
        return [];
    }
}

export const metadata: Metadata = {
    title: 'Главная',
    description: 'Главная страница',
};

export default async function Home() {
    const posts = await getPosts();

    return (
        <main className="main">
            <PostFeed posts={posts} />
        </main>
    );
}
