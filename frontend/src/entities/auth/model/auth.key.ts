export const authKey = {
    all: ['auth'] as const,
    login: () => [...authKey.all, 'login'] as const,
    register: () => [...authKey.all, 'register'] as const,
    logout: () => [...authKey.all, 'logout'] as const,
    me: () => [...authKey.all, 'me'] as const,
};