import type { ButtonProps } from '@shared/ui/ui-button/ui/UIButton';

export const createButtonsUsers = (): ButtonProps[] => [
    {
        children: 'Подписаться',
        variant: 'primary',
        size: 'md',
    },
];

export const createButtonsMe = (): ButtonProps[] => [
    {
        children: 'Редактирование профиля',
        variant: 'primary',
        size: 'md',
    },
];