import { themeNames } from '@/providers';
import { IUser } from '@entities/user';
import { tTheme } from '@/providers/theme/types/ITheme';
import { tButtonSize, tButtonType, tButtonVariant } from '@shared/ui/button/config/types';

export interface SettingsItem {
    id: 'username' | 'email' | 'theme' | 'delete';
    title: string;
    description: string;
    buttonText?: string;
    buttonSize?: tButtonSize;
    buttonVariant?: tButtonVariant;
    buttonType?: tButtonType;
    action?: tSettingsAction;
}

export type tSettingsAction =
    | 'change-username'
    | 'change-email'
    | 'toggle-theme'
    | 'delete-account';

export const createSettingsBarItems = (
    userData: IUser | null,
    theme: tTheme 
): SettingsItem[] => [
    {
        id: 'username',
        title: 'Имя пользователя',
        description: userData?.username ?? 'Not Found',
        buttonText: 'Изменить имя',
        buttonSize: 'sm',
        buttonVariant: 'primary',
        buttonType: 'button',
        action: 'change-username',
    },
    {
        id: 'email',
        title: 'Электронная почта',
        description: userData?.email  ?? 'Not Found',
        buttonText: 'Изменить почту',
        buttonSize: 'sm',
        buttonVariant: 'primary',
        buttonType: 'button',
        action: 'change-email',
    },
    {
        id: 'theme',
        title: 'Тема сайта',
        description: 'Как сайт выглядит на вашем устройстве',
        buttonText: themeNames[theme],
        buttonSize: 'sm',
        buttonVariant: 'primary',
        buttonType: 'button',
        action: 'toggle-theme',
    },
    {
        id: 'delete',
        title: 'Удалить аккаунт',
        description: 'Вы можете восстановится аккаунт в течении 30 дней',
        buttonText: 'Удалить аккаунт',
        buttonSize: 'sm',
        buttonVariant: 'danger',
        buttonType: 'button',
        action: 'delete-account',
    },
];

type SettingsAction = NonNullable<SettingsItem['action']>
type SettingsActionMap = Record<SettingsAction, () => void>;

export const createSettingsActions = (
    toggleTheme: () => void
): SettingsActionMap => ({
    'change-username': () => console.log('username'),
    'change-email': () => console.log('email'),
    'toggle-theme': () => toggleTheme(),
    'delete-account': () => console.log('delete-account'),
});