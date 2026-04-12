export type tTheme = 'light' | 'dark' | 'system';

export interface IInitialState {
    theme: tTheme;
}

export interface IActions {
    setTheme: (theme: tTheme) => void;
    toggleTheme: () => void;
}

export interface IThemeStore extends IInitialState, IActions {}