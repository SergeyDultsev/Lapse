interface iPost {
    user: {
        avatar: string | null,
        username: string,
    },
    post: {
        postId: string
        title: string,
        content: string,
        prewiew: string | null,
        status: "open" | "close",
        commentCount: number,
        saveCount: number
    }
}

export default iPost;