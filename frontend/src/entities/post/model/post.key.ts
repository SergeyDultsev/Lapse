export const postKeys = {
    all: ['posts'] as const,
    user: () => [...postKeys.all, 'user'] as const,
    feed: () => [...postKeys.all, 'feed'] as const,
    topic: () => [...postKeys.all, 'topic'] as const,
    detail: (id: string) => [...postKeys.all, 'detail', id] as const,
};