import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import UserStore from '@entities/user/model/store/UserStore';
import {observer} from "mobx-react-lite";

const routesToPage = [
    { url: '/', protected: true },
    { url: '/user/profile', protected: true },
    { url: '/user/{user_id}', protected: false },
    { url: '/authorize', protected: false },
    { url: '/create', protected: true },
    { url: '/search/', protected: false },
    { url: '/post/', protected: false },
];

function matchRoute(currentPath: string) {
    const sortedRoutes = [...routesToPage].sort((a, b) => b.url.length - a.url.length);

    for (const route of sortedRoutes) {
        const pattern = route.url.replace(/\{[^}]+\}/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        if (regex.test(currentPath)) return route;
    }
    return null;
}

export const useRouterMiddleware = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const ComponentWithAuth = (props: P) => {
        const router = useRouter();
        const currentRoute = usePathname();
        const { isAuth, isLoadingAuth } = UserStore;

        useEffect(() => {
            if (isLoadingAuth) return;

            const route = matchRoute(currentRoute);

            if (!isAuth && route?.protected) {
                router.replace('/authorize');
                return;
            }

            if (isAuth && currentRoute === '/authorize') {
                router.replace('/');
                return;
            }
        }, [isAuth, isLoadingAuth, router, currentRoute]);

        return <WrappedComponent {...props} />;
    };


    return observer(ComponentWithAuth);
};