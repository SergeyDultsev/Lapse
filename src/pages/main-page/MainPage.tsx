import React from "react";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import SubscriberList from "@/widgets/cart-info/ui/subscriber-list/SubscriberList";

const MainPage: React.FC = () => {
    const posts: Object[] = [
        {
            user: {
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
            user: {
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

    const subscribers: Object[] = [
        {
            avatar: null,
            username: "Сергей Дульцев",
        },
        {
            avatar: null,
            username: "Serejka",
        },
        {
            avatar: null,
            username: "Serejka@",
        }
    ];


    return (
        <main>
            <PostList posts={posts}/>
            <CartInfo nameCart={"Подписчики"} children={
                <SubscriberList subscribers={subscribers}/>
            }/>
        </main>
    );
}

export default MainPage;
