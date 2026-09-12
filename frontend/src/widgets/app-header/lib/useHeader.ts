import { useState } from 'react';
import { useOpenModal } from '@shared/ui/modal';
import { useToggleTheme } from '@features/theme';
import { createNavDropItems } from '@widgets/app-header/config/header.config';
import useAuth from '@features/auth/lib/useAuth';

const useHeader = () => {
    const [isDrop, setDrop] = useState(false);

    const openModal = useOpenModal();
    const toggleTheme = useToggleTheme();
    const { logout } = useAuth();

    const items = createNavDropItems({ toggleTheme, logout });

    return {
        isDrop,
        openModal,
        setDrop,
        toggleTheme,
        items,
    };
};

export default useHeader;