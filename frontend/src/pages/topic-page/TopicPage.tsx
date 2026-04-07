'use client';

import React, { useEffect } from 'react';

import Topic from '@/entities/topic/ui/Topic';
import { ITopic } from '@/entities/topic/model/ITopic';
import { useTopicStore } from '@/entities/topic/model/topic.store';
import { LoaderSpinner } from '@/shared';
import { usePostsTopic } from '@/entities/post/model/post.queries';
import PostList from '@/entities/post/ui/post-list/PostList';

const TopicPage: React.FC<ITopic> = ({
    id,
    title,
    description,
    countPosts,
    countReaders,
}) => {
    const storeTopic = useTopicStore();
    const setTopic = storeTopic.setTopic;
    const { data, isPending } = usePostsTopic();

    useEffect(() => {
       setTopic({ id, title, description, countPosts, countReaders });
    }, [id, title, description, countPosts, countReaders]);

    if (isPending) {
        return (
            <section className="loader-spinner__block">
                <LoaderSpinner />
            </section>
        );
    }
    
    if (!data) {
        return (
            <section className="main">
                <div>Нет данных</div>
            </section>
        );
    }

    return (
        <main className="main">
            <Topic />
            <PostList posts={data} />
        </main>
    );
};

export default TopicPage;