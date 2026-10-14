import { apiFetch } from '@shared/api';
import { IUser } from '@modules/users/model/types';

export const checkAuth = () =>
    apiFetch<IUser>('/auth/me', { skipAuthRetry: true });
