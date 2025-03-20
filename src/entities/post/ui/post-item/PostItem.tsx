import React from "react";
import styles from "./PostItem.module.scss";
import SaveIcon from "@/assets/icon/SaveIcon";
import CommentIcon from "@/assets/icon/CommentIcon";
import IPost from "@/entities/post/model/types/iPost";

const PostItem: React.FC<IPost> = ({ user, post }) => {
    return (
        <article className={styles["post"]}>

            <div className={styles["user-info"]}>
                {user.avatar && (
                    <img 
                        className={styles["user_info__avatar"]} 
                        src={user.avatar} 
                        alt="avatar" 
                        loading="lazy" />
                )}
                <h2 className={styles["user-info__name"]}>{user.username}</h2>
            </div>
            
            <div className={styles["post-content"]}>
                <h2 className={styles["post-content__title"]}>{post.title}</h2>
                <p className={styles["post-content__content"]}>{post.content} </p>
                {post.prewiew && (
                        <img 
                            className={styles["post-content__prewiew"]} 
                            src={post.prewiew}
                            alt="avatar" 
                            loading="lazy" />
                )}
            </div>

            <div className={styles["post-option__list"]}>
                <div className={styles["post-option__item"]}>
                    <div className={styles["post-option__item__counter"]}>
                        {post.commentCount}
                    </div>
                    <CommentIcon/>
                </div>
                <div className={styles["post-option__item"]}>
                    <div className={styles["post-option__item__counter"]}>
                        {post.saveCount}
                    </div>
                    <SaveIcon/>
                </div>
            </div>
            
        </article>
    );
}

export default PostItem;