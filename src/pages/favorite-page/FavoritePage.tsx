"use client";

import React, {useEffect} from "react";
import {toJS} from "mobx";
import {observer} from "mobx-react-lite";
import { useRouterMiddleware } from "@/middleware/useRouterMiddleware";
import PostList from "@widgets/post-list/ui/PostList";
import IPost from "@entities/post/model/types/iPost";
import FavoriteStore from "@entities/favorite/model/store/FavoriteStore";

const FavoritePage: React.FC = observer(() => {
    const favoritePosts: IPost[] = toJS(FavoriteStore?.favoritesData) || [];

    useEffect(() => {
        FavoriteStore.getFavoriteById();
    }, []);

    return (
        <main className="main">
            {favoritePosts.length > 0 &&
                <PostList posts={favoritePosts}/>
            }
        </main>
    );
});

export default useRouterMiddleware(FavoritePage);
