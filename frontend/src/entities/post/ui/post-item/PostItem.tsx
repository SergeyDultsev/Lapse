'use client';

import React from 'react';
import styles from './PostItem.module.scss';
import { IPost } from '@/entities/post/types';
import AltAvatar from '@/assets/img/avatar.jpg';
import { MenuIcon } from 'shared';
import {
    FavoriteIcon,
    CommentIcon,
    EyeIcon,
    shortyNumber,
} from 'shared';

const PostItem: React.FC<IPost> = ({ author, title, body, meta }) => {
    return (
        <article className={styles['post-item']}>
            <div className={styles['post-item__author']}>
                <div className={styles['post-item__author__info']}>
                    <img className={styles['post-item__author__avatar']} src={AltAvatar.src}  alt={'alt'}/>
                    <h2 className={styles['post-item__author__username']}>{ author.username }</h2>
                </div>
                <div className={styles['post-item__author__option']}>
                    <MenuIcon />
                </div>
            </div>
            <h2 className={styles['post-item__title']}>{ title }</h2>
            <p className={styles['post-item__body']}>{ body }</p>
            <div className={styles['post-item__control']}>
                <button className={styles['post-item__control__item']}>
                    <FavoriteIcon /> { shortyNumber(meta.countLike) }
                </button>
                <button className={styles['post-item__control__item']}>
                    <CommentIcon /> { shortyNumber(meta.countComment) }
                </button>
                <button className={styles['post-item__control__item']}>
                    <EyeIcon /> { shortyNumber(meta.countView) }
                </button>
            </div>
        </article>
    );
};

export default PostItem;