interface iPost {
    user: {
        avatar: string | null,
        username: string,
    },
    post: {
        title: string,
        content: string,
        prewiew: string | null,
        commentCount: number,
        saveCount: number
    }
}

export default iPost;