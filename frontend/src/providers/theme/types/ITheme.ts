export type tTheme = 'light' | 'dark' | 'system';

export const themeNames: Record<tTheme, string> = {
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
} as const;


export interface IInitialState {
    theme: tTheme;
}

export interface IActions {
    setTheme: (theme: tTheme) => void;
    toggleTheme: () => void;
}

export interface IThemeStore extends IInitialState, IActions {}