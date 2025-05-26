interface iPost {
    post_id: string
    title: string,
    content: string,
    preview_url: string | null,
    comment_count: number,
    save_count: number,
    is_favorite: boolean,
    is_open: boolean,
    user: {
        user_id: string | null,
        full_name: string,
        avatar_url: string | null,
    },
}

export default iPost;