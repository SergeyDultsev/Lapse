'use client'

import React from "react";
import styles from "./PostList.module.scss";

export const PostList = () => {
    return (
        <section className={styles['post-list']}>
            <PostList />
        </section>
    );
}

export default PostList;