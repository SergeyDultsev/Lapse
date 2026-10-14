import { apiFetch } from '@shared/api';
import { IUser } from '@modules/users/model/types';
import { ILogin } from '../model/types';

export const login = (loginData: ILogin) =>
    apiFetch<IUser>('/auth/login', { method: 'POST', body: loginData });
