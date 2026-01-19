'use client'

import React from "react";
import styles from "./PostItem.module.scss";
import {IPost} from "@/entities/post/types";

const PostItem: React.FC<IPost> = ({ title, body, meta }) => {
    return (
        <article className={styles['post-item']}>
            <h2 className={styles['post-item__title']}>{ title }</h2>
            <p className={styles['post-item__body']}>{ body }</p>
            <div className={styles['post-item__control']}>
                <button>{ meta.countLike } лайки</button>
                <button>{ meta.countComment } коммент</button>
                <button>{ meta.countView } просмотр</button>
            </div>
        </article>
    );
}

export default PostItem;