/**
 * UI
 */
export { default as UserWidget } from './ui/user-widget/UserWidget';
export { default as UserAvatar } from './ui/user-avatar/UserAvatar';

/**
 * model
 */
export { getUser } from './api/getUser';

export { userKeys } from './model/user.key';

export type { IUser } from './model/types';
export type { IPropsAvatar } from './ui/user-avatar/UserAvatar';
