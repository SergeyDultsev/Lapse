import { createNavDropItems } from '@widgets/app-header/config/header.config';
import useAuth from '@modules/auth/lib/useAuth';
import { useTheme } from '@/providers/ThemeProvider';

const useHeader = () => {
    const { logout } = useAuth();
    const { toggleTheme } = useTheme();

    const items = createNavDropItems({ logout, toggleTheme });

    return {
        items,
    };
};

export default useHeader;