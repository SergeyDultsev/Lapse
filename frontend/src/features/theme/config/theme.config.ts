import { tTheme } from '@features/theme/model/theme.types';

export const themeNames: Record<tTheme, string> = {
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
} as const;
