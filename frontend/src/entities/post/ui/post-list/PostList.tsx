'use client';

import React from 'react';
import styles from './PostList.module.scss';
import PostItem from '@/entities/post/ui/post-item/PostItem';
import { IPostList } from '@/entities/post/types';

const PostList: React.FC<IPostList> = ({ posts }) => {
    return (
        <section className={styles['post-list']}>
            {posts.map((item) => (
                <PostItem
                    key={item.id}
                    id={item.id}
                    author={item.author }
                    title={item.title}
                    body={item.body}
                    meta={item.meta}
                />
            ))}
        </section>
    );
};

export default PostList;