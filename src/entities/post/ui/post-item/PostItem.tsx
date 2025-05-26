import React from "react";
import styles from "./PostItem.module.scss";
import AvatarDefault from "@assets/img/avatar.jpg";
import SaveIcon from "@/assets/icon/SaveIcon";
import CommentIcon from "@/assets/icon/CommentIcon";
import IPost from "@/entities/post/model/types/iPost";
import IUser from "@entities/user/model/types/iUser";
import UserStore from "@entities/user/model/store/UserStore";
import PostStore from "@entities/post/model/store/PostStore";
import FavoriteStore from "@entities/favorite/model/store/FavoriteStore";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";

const PostItem: React.FC<IPost> = observer(({ user, post }) => {
    const userAuthorizedData: IUser | null = toJS(UserStore.userAuthorized);

    console.log(post)
    return (
        <article className={styles["post"]}>
            <div className={styles["user-info"]}>
                {user.avatar_url ? (
                    <img
                        className={styles["user-info__avatar"]}
                        srcSet={`${user.avatar_url} 1x, ${user.avatar_url.replace('.jpg', '@2x.jpg')} 2x`}
                        alt="avatar"
                        loading="lazy"
                    />
                ) : (
                    <img className={styles['user-info__avatar']}
                         src={AvatarDefault.src}
                         alt="avatar"
                         loading="lazy"
                    />
                )}
                <h2 className={styles["user-info__name"]}>{user.full_name}</h2>
            </div>

            <div className={styles["post-content"]}>
                <h2 className={styles["post-content__title"]}>{post.title}</h2>
                <p className={styles["post-content__content"]}>{post.content} </p>
                {post.preview_url && (
                    <img
                        className={styles["post-content__prewiew"]}
                        src={post.preview_url}
                        alt="avatar"
                        loading="lazy"/>
                )}
            </div>

            <div className={styles["post-option__list"]}>
                <div className={styles["post-option__item"]}>
                    <div className={styles["post-option__item__counter"]}>
                        {post.comment_count}
                    </div>
                    <CommentIcon/>
                </div>
                <div
                    className={!post.is_favorite ? styles["post-option__item"] : styles["post-option__item__active"]}
                    onClick={() => FavoriteStore.isFavoriteById(post.post_id)}>
                    <div className={styles["post-option__item__counter"]}>
                        {post.save_count}
                    </div>
                    <SaveIcon/>
                </div>
                {userAuthorizedData?.user_id === post.user.user_id ? (
                    <div className={styles["post-option__item"]} onClick={() => PostStore.deletePostById(post.post_id)}>
                        <div className={styles["post-option__item__counter"]}>
                            Удалить пост
                        </div>
                    </div>
                ) : ''}
            </div>
        </article>
    );
})

export default PostItem;