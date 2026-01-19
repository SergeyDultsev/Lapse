'use client'

import React from "react";
import styles from "./PostItem.module.scss";
import { IPost } from "@/entities/post/types";
import {
    FavoriteIcon,
    CommentIcon,
    EyeIcon
} from "shared";

const PostItem: React.FC<IPost> = ({ author, title, body, meta }) => {
    return (
        <article className={styles['post-item']}>
            <div className={styles['post-item__author']}>
                <h2 className={styles['post-item__author__username']}>{ author.username }</h2>
            </div>
            <h2 className={styles['post-item__title']}>{ title }</h2>
            <p className={styles['post-item__body']}>{ body }</p>
            <div className={styles['post-item__control']}>
                <button className={styles['post-item__control__item']}>
                    <FavoriteIcon /> { meta.countLike }
                </button>
                <button className={styles['post-item__control__item']}>
                    <CommentIcon /> { meta.countComment }
                </button>
                <button className={styles['post-item__control__item']}>
                    <EyeIcon /> { meta.countView }
                </button>
            </div>
        </article>
    );
}

export default PostItem;