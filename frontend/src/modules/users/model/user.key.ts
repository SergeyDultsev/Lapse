export const userKeys = {
    all: ['users'] as const,
    user: (id?: string) => [...userKeys.all, 'user', id],
    subscribe: () => [...userKeys.all, 'subscribe'],
};