import { IPost } from '@/entities/post/model/types';

export const postsTopic: IPost[] = [
    {
        id: '1',
        title: 'Заголовок',
        body: 'Текст',
        author: {
            id: '1',
            username: 'Serejka',
            email: 'email@',
            bio: '',
            countFollowers: 0,
            countSubscriptions: 0,
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
            bio: '',
            countFollowers: 0,
            countSubscriptions: 0,
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
            bio: '',
            countFollowers: 0,
            countSubscriptions: 0,
        },
        meta: {
            countLike: 23,
            countComment: 1,
            countView: 130,
        },
    },
];