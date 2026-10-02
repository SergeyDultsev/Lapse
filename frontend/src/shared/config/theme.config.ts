export type tTheme = 'light' | 'dark' | 'system';

export const themeNames: Record<tTheme, string> = {
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
} as const;

export const THEME_STORAGE_KEY = 'theme-storage';