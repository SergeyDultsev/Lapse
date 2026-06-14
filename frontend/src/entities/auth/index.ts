/**
 * API
 */

export { login } from './api/login';

export { register } from './api/register';

export { checkAuth } from './api/checkAuth';

export { logout } from './api/logout';

/**
 * model
 */
export { authKey } from './model/auth.key';

export { useLogin, useRegister, useMe, useLogout } from './model/auth.queries';

export type { ILogin } from './model/types';

export type { IRegister } from './model/types';