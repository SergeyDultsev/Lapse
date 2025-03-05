import React from "react";
import styles from "./PostList.module.scss";
import PostItem from "@/entities/post/ui/post-item/PostItem";
import ButtonDefault from "@/assets/shared/ui/button/ButtonDefault";

interface IPosts {
    posts: object[]
}

const PostList: React.FC<IPosts> = ({ posts }) => {
    return (
        <section className={styles["posts"]}>
            <div className={styles["posts-btns"]}>
                <ButtonDefault name={"allPost"} active={true} type="button" disabled={false}>Все посты</ButtonDefault>
                <ButtonDefault name={"openPost"} active={false} type="button" disabled={false}>Доступные посты</ButtonDefault>
                <ButtonDefault name={"closePost"} active={false} type="button" disabled={false}>Эксклюзивные посты</ButtonDefault>
            </div>
            {posts.map((postItem, index) => 
                <PostItem user={postItem.user} content={postItem.post} key={index}/>
            )}
        </section>
    );
}

export default PostList;