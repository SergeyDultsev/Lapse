import { useMe } from '@entities/auth';
import { useMemo } from 'react';
import { createButtonsMe, createButtonsUsers } from '@widgets/profile-bar/config/profile-bar.config';

export const useProfileBar = (id: string) => {

    const { data: me } = useMe();

    const buttonMe = useMemo(
        () => createButtonsMe(),
        [id]
    );

    const buttonUser = useMemo(
        () => createButtonsUsers(),
        [id]
    );

    return {
        buttonMe,
        buttonUser,
        me,
    };
};