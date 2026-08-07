export { default as ThemeProvider } from '@providers/theme/ui/ThemeProvider';

export { 
    useTheme, 
    useSetTheme, 
    useToggleTheme, 
} from '@providers/theme/model/theme.store';

export type {
    IThemeStore,
    themeNames,
} from '@providers/theme/types/ITheme';