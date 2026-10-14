import { apiFetch } from '@shared/api';
import { IUser } from '../model/types';

export const getUserById = (id: string) =>
    apiFetch<IUser>(`/users/${id}`);
