import { apiFetch } from '@shared/api';

export const logout = () =>
    apiFetch('/auth/logout', { method: 'POST', skipAuthRetry: true });
