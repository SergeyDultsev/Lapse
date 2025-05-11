import React, {useEffect} from "react";
import {observer} from "mobx-react-lite";
import styles from "./PostList.module.scss";
import PostItem from "@/entities/post/ui/post-item/PostItem";
import ButtonDefault from "@/shared/ui/button/ButtonDefault";
import iPost from "@/entities/post/model/types/iPost";
import PostFilterStore from "@/entities/post/model/store/PostFilterStore";

interface IPosts  {
    posts: iPost[];
}

const PostList: React.FC<IPosts> = observer(({ posts }) => {
    useEffect((): void => {
        PostFilterStore.filterPosts(posts, "allPost");
    }, [posts]);

    const filterPostsHandle = (filterFlag: string | boolean): void => {
        PostFilterStore.filterPosts(posts, filterFlag);
    };

    return (
        <section className={styles["posts"]}>
            <div className={styles["posts-btns"]}>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle("allPost")}
                    name="allPost"
                    active={PostFilterStore.filteredFlag == "allPost"}
                    type="button"
                >
                    Все посты
                </ButtonDefault>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle("open")}
                    name="openPost"
                    active={PostFilterStore.filteredFlag == true}
                    type="button"
                >
                    Открытые посты
                </ButtonDefault>
                <ButtonDefault
                    style={{ width: "158px" }}
                    onClick={() => filterPostsHandle("close")}
                    name="closePost"
                    active={PostFilterStore.filteredFlag == false}
                    type="button"
                >
                    Закрытые посты
                </ButtonDefault>
            </div>
            {PostFilterStore.filteredPosts.map((postItem: iPost) => (
                <PostItem user={postItem.user} post={postItem} key={postItem.post_id} />
            ))}
        </section>
    );
});

export default PostList;