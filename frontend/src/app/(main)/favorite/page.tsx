import type { Metadata } from 'next';
import FavoritePage from '@pages/favorite-page/FavoritePage';

export const metadata: Metadata = {
    title: 'Избранное',
};

export default function Favorite() {
    return (
        <FavoritePage />
    );
}
