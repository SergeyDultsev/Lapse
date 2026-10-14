const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
const SERVER_API_URL = process.env.API_URL || 'http://localhost:3000';

/**
 * Ошибка API с HTTP-статусом и сообщением от сервера.
 */
export class ApiError extends Error {
    constructor(
        public readonly status: number,
        message: string
    ) {
        super(message);
        this.name = 'ApiError';
    }
}

export const isApiError = (error: unknown, status?: number): error is ApiError =>
    error instanceof ApiError && (status === undefined || error.status === status);

type AuthFailureListener = () => void;

const authFailureListeners = new Set<AuthFailureListener>();

/**
 * Подписывается на событие «сессия истекла и не удалось обновить».
 * Возвращает функцию отписки.
 */
export const onAuthFailure = (listener: AuthFailureListener): (() => void) => {
    authFailureListeners.add(listener);
    return () => authFailureListeners.delete(listener);
};

const emitAuthFailure = () => {
    authFailureListeners.forEach((listener) => listener());
};

export type ApiFetchOptions = Omit<RequestInit, 'body'> & {
    /** Тело запроса — будет сериализовано в JSON. */
    body?: unknown;
    /**
     * Не пытаться обновить токен при 401 и не открывать окно авторизации.
     * Используется для проверки сессии (checkAuth), где 401 — штатный ответ.
     */
    skipAuthRetry?: boolean;
};

let refreshPromise: Promise<boolean> | null = null;

const refreshTokens = (): Promise<boolean> => {
    if (!refreshPromise) {
        refreshPromise = fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        })
            .then((response) => response.ok)
            .catch(() => false)
            .finally(() => {
                refreshPromise = null;
            });
    }

    return refreshPromise;
};

/**
 * Тонкий клиент к backend API.
 *
 * - подставляет base URL (на сервере — API_URL, в браузере — NEXT_PUBLIC_API_URL);
 * - шлёт JSON и cookies;
 * - при 401 один раз пытается обновить токен и повторить запрос
 *   (single-flight: параллельные запросы ждут одного рефреша);
 * - разбирает стандартный envelope `{ data, message, statusCode }`
 *   и возвращает только `data`;
 * - при ошибке бросает ApiError. Никогда не редиректит сам.
 */
export async function apiFetch<T>(path: string, options: ApiFetchOptions = {}): Promise<T> {
    const isServer = typeof window === 'undefined';
    const baseUrl = isServer ? SERVER_API_URL : API_URL;
    const url = path.startsWith('http') ? path : `${baseUrl}${path}`;

    const { body, headers, skipAuthRetry, ...rest } = options;

    const response = await fetch(url, {
        ...rest,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401 && !isServer && !skipAuthRetry) {
        const refreshed = await refreshTokens();

        if (refreshed) {
            return apiFetch<T>(path, { ...options, skipAuthRetry: true });
        }

        emitAuthFailure();
    }

    const payload: unknown = await response.json().catch(() => null);

    if (!response.ok) {
        const rawMessage =
            payload && typeof payload === 'object'
                ? (payload as { message?: string | string[] }).message
                : undefined;

        const message = Array.isArray(rawMessage)
            ? rawMessage.join(', ')
            : rawMessage || `Request failed with status ${response.status}`;

        throw new ApiError(response.status, message);
    }

    if (
        payload &&
        typeof payload === 'object' &&
        'data' in payload &&
        'statusCode' in payload
    ) {
        return (payload as { data: T }).data;
    }

    return payload as T;
}
