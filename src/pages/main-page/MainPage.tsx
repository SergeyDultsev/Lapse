import PostList from "@/widgets/post-list/ui/PostList";
import React from "react";

const MainPage: React.FC = () => {
    const posts: Object[] = [
        {
            author: {
                avatar: null,
                username: "Сергей Дульцев",
            },
            post: {
                title: "Пост 1",
                content: "Контент поста 1",
                prewiew: null,
                commentCount: 6,
                saveCount: 2
            }
        },
        {
            author: {
                avatar: null,
                username: "Сергей Дульцев",
            },
            post: {
                title: "Пост 2",
                content: "Контент поста 2",
                prewiew: null,
                commentCount: 10,
                saveCount: 5
            }
        }
    ];

    return (
        <main>
            <PostList posts={posts}/>
        </main>
    );
}

export default MainPage;
