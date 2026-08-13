'use client';

import React from 'react';
import { PostList } from '@/entities/post';

const FeedPage: React.FC = () => {

    return (
        <main className="main">
            <PostList posts={[]} isLoading={false} />
        </main>
    );
};

export default FeedPage;
