interface iPost {
    post_id: string
    title: string,
    content: string,
    preview_url: string | null,
    comment_count: number,
    save_count: number,
    is_favorite: false,
    is_open: true,
    user: {
        user_id: string | null,
        full_name: string,
        avatar_url: string | null,
    },
}

export default iPost;