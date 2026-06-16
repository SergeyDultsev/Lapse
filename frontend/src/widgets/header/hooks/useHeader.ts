import { useMemo, useState } from 'react';
import { useOpenModal } from '@providers/modal/model/modal.store';
import { useToggleTheme } from '@/providers';
import { createNavDropItems } from '@widgets/header/config/header.config';
import useAuth from '@features/auth/hooks/useAuth';


const useHeader = () => {
    const [isDrop, setDrop] = useState(false);

    const openModal = useOpenModal();
    const toggleTheme = useToggleTheme();
    const { logout } = useAuth();

    const items = useMemo(
        () => createNavDropItems({ toggleTheme, logout }),
        [toggleTheme, logout]
    );

    return {
        isDrop,
        openModal,
        setDrop,
        toggleTheme,
        items,
    };
};

export default useHeader;