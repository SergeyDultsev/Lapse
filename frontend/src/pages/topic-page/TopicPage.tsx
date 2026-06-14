'use client';

import React, { useEffect } from 'react';

import { Topic, ITopic, useTopicStore } from '@/entities/topic';
import { PostList, usePostsTopic } from '@/entities/post';
import { LoaderBase } from '@/shared';

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
                <LoaderBase />
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
