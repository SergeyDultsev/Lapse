import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import styles from "./PostList.module.scss";
import PostItem from "@/entities/post/ui/post-item/PostItem";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import iPost from "@/entities/post/model/types/iPost";
import PostStore from "@entities/post/model/store/PostStore";
import filterPosts from "@shared/utils/filterPosts";
import IPost from "@entities/post/model/types/iPost";

interface IPosts  {
    posts: iPost[];
}

const PostList: React.FC<IPosts> = observer(({ posts }) => {
    let postsData: IPost[] = filterPosts(posts, PostStore.filteredFlag);

    const filterPostsHandle = (filterFlag: string | boolean): void => {
        PostStore.changeFilteredFlag(filterFlag);
    };

    return (
        <section className={styles["posts"]}>
            <div className={styles["posts-btns"]}>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle("allPost")}
                    name="allPost"
                    active={PostStore.filteredFlag == "allPost"}
                    type="button"
                >
                    Все посты
                </ButtonDefault>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle(true)}
                    name="openPost"
                    active={PostStore.filteredFlag == true}
                    type="button"
                >
                    Открытые посты
                </ButtonDefault>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle(false)}
                    name="closePost"
                    active={PostStore.filteredFlag == false}
                    type="button"
                >
                    Закрытые посты
                </ButtonDefault>
            </div>
            {postsData.map((postItem: iPost) => (
                <PostItem user={postItem.user} post={postItem} key={postItem.post_id} />
            ))}
        </section>
    );
});

export default PostList;