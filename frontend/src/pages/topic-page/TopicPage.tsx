"use client";

import React, {useEffect} from "react";

import Topic from "@entities/topic/ui/Topic";
import { ITopic } from "@entities/topic/model/ITopic";
import { useTopicStore } from "@entities/topic/model/topic.store";

const TopicPage: React.FC<ITopic> = ({
    id,
    title,
    description,
    countPosts,
    countReaders
}) => {
    const storeTopic = useTopicStore();
    const setTopic = storeTopic.setTopic;

    useEffect(() => {
       setTopic({ id, title, description, countPosts, countReaders });
    }, [id, title, description, countPosts, countReaders]);

    return (
        <main className="main">
            <Topic />
        </main>
    );
}

export default TopicPage;