export const userKeys = {
    all: ['users'] as const,
    user: () => [...userKeys.all, 'user'],
    subscribe: () => [...userKeys.all, 'subscribe'],
};