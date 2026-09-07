'use client';

import React from 'react';
import styles from './PostCard.module.scss';
import { IPost } from '@/entities/post/model/types';
import AltAvatar from '@/assets/img/avatar.jpg';
import { MenuIcon } from 'shared';
import {
    FavoriteIcon,
    CommentIcon,
    EyeIcon,
    useShortyNumber,
} from 'shared';
const PostCard: React.FC<IPost> = (
    {
        author,
        title,
        textContent,
        meta,
    }) => {

    return (
        <article className={styles['post-item']}>
            <div className={styles['post-item__author']}>
                <div className={styles['post-item__author__info']}>
                    <img className={styles['post-item__author__avatar']} src={ AltAvatar.src }  alt={ AltAvatar.src }/>
                    <h2 className={styles['post-item__author__username']}>{ meta?.author.username }</h2>
                </div>
                <div className={styles['post-item__author__option']}>
                    <MenuIcon />
                </div>
            </div>
            <h2 className={styles['post-item__title']}>{ title }</h2>
            <p className={styles['post-item__body']}>{ textContent }</p>
            <div className={styles['post-item__control']}>
                <button className={styles['post-item__control__item']}>
                    <FavoriteIcon /> { useShortyNumber(meta.countLike) }
                </button>
                <button className={styles['post-item__control__item']}>
                    <CommentIcon /> { useShortyNumber(meta.countComment) }
                </button>
                <button className={styles['post-item__control__item']}>
                    <EyeIcon /> { useShortyNumber(meta.countView) }
                </button>
            </div>
        </article>
    );
};

export default PostCard;