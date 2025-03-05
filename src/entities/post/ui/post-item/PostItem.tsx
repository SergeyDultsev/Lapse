import React from "react";
import styles from "./PostItem.module.scss";
import SaveIcon from "@/assets/icon/SaveIcon";
import CommentIcon from "@/assets/icon/CommentIcon";

interface IPost {
    user: {
        avatar: string | null;
        username: string;
    };
    content: {
        title: string;
        content: string;
        prewiew: string | null;
        commentCount: number;
        saveCount: number;
    };
}

const PostItem: React.FC<IPost> = ({ user, content }) => {
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
                <h2 className={styles["post-content__title"]}>{content.title}</h2>
                <p className={styles["post-content__content"]}>{content.content} </p>
                {content.prewiew && (
                        <img 
                            className={styles["post-content__prewiew"]} 
                            src={content.prewiew} 
                            alt="avatar" 
                            loading="lazy" />
                )}
            </div>

            <div className={styles["post-option__list"]}>
                <div className={styles["post-option__item"]}>
                    <div className={styles["post-option__item__counter"]}>
                        {content.commentCount}
                    </div>
                    <CommentIcon/>
                </div>
                <div className={styles["post-option__item"]}>
                    <div className={styles["post-option__item__counter"]}>
                        {content.saveCount}
                    </div>
                    <SaveIcon/>
                </div>
            </div>
            
        </article>
    );
}

export default PostItem;