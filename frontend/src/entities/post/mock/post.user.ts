import { IPost } from '@/entities/post/types';

export const postsUser: IPost[] = [
    {
        id: '1',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Serejka',
            email: 'email@',
        },
        meta: {
            countLike: 12,
            countComment: 4,
            countView: 120,
        },
    },
    {
        id: '2',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Serejka',
            email: 'email@',
        },
        meta: {
            countLike: 34,
            countComment: 42,
            countView: 123,
        },
    },
    {
        id: '3',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Serejka',
            email: 'email@',
        },
        meta: {
            countLike: 23,
            countComment: 1,
            countView: 130,
        },
    },
];