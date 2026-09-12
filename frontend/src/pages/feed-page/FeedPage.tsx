'use client';

import React from 'react';
import { PostFeed } from '@widgets/post-feed';

const FeedPage: React.FC = () => {

    return (
        <main className="main">
            <PostFeed posts={[]} isLoading={false} />
        </main>
    );
};

export default FeedPage;
