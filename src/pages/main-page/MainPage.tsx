import React from "react";
import CartInfo from "@/widgets/cart-info/CartInfo";
import PostList from "@/widgets/post-list/ui/PostList";
import UserList from "@/widgets/cart-info/ui/user-list/UserList";
import iPost from "@/entities/post/model/types/iPost";
import iUserBrief from "@/entities/user/model/types/iUserBrief";
import postStore from "@/entities/post/model/post";
import userStore from "@/entities/user/model/user";

const MainPage: React.FC = () => {
    const posts: iPost[] = postStore?.postsData || [];
    const users: iUserBrief[] = userStore?.usersData || [];

    return (
        <main>
            <PostList posts={posts}/>
            <CartInfo nameCart={"Подписки"} children={
                <UserList users={users}/>
            }/>
        </main>
    );
}

export default MainPage;
