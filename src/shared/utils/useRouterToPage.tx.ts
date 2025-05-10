import {usePathname, useRouter} from 'next/navigation';
import UserStore from "@/entities/user/model/store/UserStore";

const routesToPage = [
    { url: '/', protected: false },
    { url: '/profile', protected: true },
    { url: '/authorize', protected: false },
    { url: '/create', protected: true },
    { url: '/search/', protected: false },
    { url: '/post/', protected: false },
];

const useRouterToPage = (): ((url: string) => void) => {
    const router = useRouter();
    const currentPath = usePathname();

    return (url: string): void => {
        const isAuth = UserStore.userIsAuth;
        const route = routesToPage.find(route => route.url === url);

        if (!route) {
            router.push('/');
            return;
        }

        if (currentPath === url) return;

        if (route.protected && !isAuth) {
            router.push('/authorize');
            return;
        }

        router.push(url);
    };
}

export default useRouterToPage;