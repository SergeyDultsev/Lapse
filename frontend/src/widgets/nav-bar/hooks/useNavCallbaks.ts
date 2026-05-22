import {
    useToggleTheme,
} from 'providers';

export const useNavCallbaks = () => {
    const toggleTheme = useToggleTheme();
    
    const getCallback = (name: string): (() => void) | undefined => {
        const callbacks = { 'theme': toggleTheme };
        return callbacks[name];
    };

    return { getCallback };
};