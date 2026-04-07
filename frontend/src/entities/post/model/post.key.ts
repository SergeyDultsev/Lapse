export const postKeys = {
    all: ['posts'] as const,
    user: () => [...postKeys.all, 'user'] as const,
    feed: () => [...postKeys.all, 'feed'] as const,
    topic: () => [...postKeys.all, 'topic'] as const,
};