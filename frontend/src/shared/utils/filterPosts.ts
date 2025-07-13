import iPost from "@entities/post/model/types/iPost";

const filterPosts = (postsData: iPost[], methodFilter: boolean | string) => {
    if (methodFilter === "allPost") {
        return postsData;
    }
    return postsData.filter(postItem => postItem?.is_open === methodFilter);
};

export default filterPosts;