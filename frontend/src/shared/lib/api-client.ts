import { redirect } from 'next/navigation';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;

async function refreshToken(): Promise<boolean> {
    try {
        const response = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            credentials: 'include',
        });
        return response.ok;
    } catch {
        return false;
    }
}

async function getRefreshedToken(): Promise<boolean> {
    if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = refreshToken().finally(() => {
            isRefreshing = false;
            refreshPromise = null;
        });
    }
    return refreshPromise!;
}

export async function apiClient(
    path: string,
    options: RequestInit = {}
): Promise<Response> {
    const url = path.startsWith('http') ? path : `${API_URL}${path}`;

    const fetchOptions: RequestInit = {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    };

    let response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        const refreshSucceeded = await getRefreshedToken();

        if (refreshSucceeded) {
            response = await fetch(url, fetchOptions);
        }
    }

    if (response.status === 404 || response.status === 500) {
        redirect('/not-found');
    }

    return response;
}
