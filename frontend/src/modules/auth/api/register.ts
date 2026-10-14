import { apiFetch } from '@shared/api';
import { IRegister } from '../model/types';

export const register = (registerData: IRegister) =>
    apiFetch('/auth/register', { method: 'POST', body: registerData });
