import {redirect, useParams, usePathname, useRouter} from 'next/navigation';
import UserStore from "@entities/user/model/store/UserStore";
import {useEffect} from "react";

const routesToPage = [
    { url: '/', protected: false },
    { url: '/profile', protected: true },
    { url: '/user/{user_id}', protected: false },
    { url: '/authorize', protected: false },
    { url: '/create', protected: true },
    { url: '/search/', protected: false },
    { url: '/post/', protected: false },
];

export const useRouterMiddleware = (): void => {
    const currentPath = usePathname();
    const { isAuth, isLoadingAuth } = UserStore;

    useEffect(() => {
        if (isLoadingAuth) return;

        const sortedRoutes = [...routesToPage].sort((a, b) => b.url.length - a.url.length);
        const route = sortedRoutes.find(route => currentPath?.startsWith(route.url));

        if (route?.protected && !isAuth) {
            redirect('/authorize');
        }

        if(route?.url == '/authorize' && isAuth){
            redirect('/');
        }

    }, [currentPath, isAuth]);
}