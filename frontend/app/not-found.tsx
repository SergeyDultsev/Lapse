import type { Metadata } from 'next';
import NotFoundPage from '@pages/not-found-page/NotFoundPage';

export const metadata: Metadata = {
    title: '404',
    description: 'Страница 404',
};

export default function NotFound() {
    return (
        <NotFoundPage />
    );
}