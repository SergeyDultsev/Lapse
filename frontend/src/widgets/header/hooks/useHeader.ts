import { useMemo, useState } from 'react';
import { useOpenModal } from '@providers/modal/model/modal.store';
import { useToggleTheme } from '@/providers';
import { createNavDropItems } from '@widgets/header/config/header.config';

const useHeader = () => {
    const [isDrop, setDrop] = useState(false);

    const openModal = useOpenModal();
    const toggleTheme = useToggleTheme();

    const items = useMemo(
        () => createNavDropItems({ toggleTheme }),
        [toggleTheme]
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