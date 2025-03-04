import React from "react";
import styles from "./PostList.module.scss";
import PostItem from "@/entities/post/ui/post-item/PostItem";

interface IPosts {
    posts: object[]
}

const PostList: React.FC<IPosts> = ({ posts }) => {
    return (
        <section className={styles["posts"]}>
            {posts.map((postItem, index) => 
                <PostItem author={postItem.author} content={postItem.post} key={index}/>
            )}
        </section>
    );
}

export default PostList;