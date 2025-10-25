export type ITheme = 'light' | 'dark';

export interface IThemeStore {
    theme: ITheme;
    setTheme: (theme: ITheme) => void;
    toggleTheme: () => void;
}