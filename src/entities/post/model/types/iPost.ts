interface iPost {
    post_id: string
    title: string,
    content: string,
    preview_url: string | null,
    status: "open" | "byTier",
    is_favorite: boolean
    comment_count: number,
    save_count: number
    user: {
        user_id: string | null,
        full_name: string,
        avatar_url: string | null,
    },
}

export default iPost;