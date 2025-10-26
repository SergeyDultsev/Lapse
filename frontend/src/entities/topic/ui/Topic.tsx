'use client'

import React from "react";
import styles from './Topic.module.scss'
import { useTopicStore } from "@entities/topic/model/topic.store";

const Topic: React.FC = () => {
    const storeTopic = useTopicStore();

    return (
        <section className={styles['topic']}>
            <div className={styles['topic-info']}>
                <h2 className={styles['topic-info__title']}>{ storeTopic.title }</h2>
                <p className={styles['topic-info__description']}>{ storeTopic.description }</p>
                <div className={styles['topic-info__counts']} >
                    <span className={styles['topic-info__count']}>Посты { storeTopic.countPosts }</span>
                    <span className={styles['topic-info__count']}>Читатели { storeTopic.countReaders }</span>
                </div>
            </div>
        </section>
    );
}

export default Topic;