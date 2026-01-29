export type ITheme = 'light' | 'dark' | 'system';

export interface IInitialState {
    theme: ITheme;
}

export interface IActions {
    setTheme: (theme: ITheme) => void;
    toggleTheme: () => void;
}

export interface IThemeStore extends IInitialState, IActions {}