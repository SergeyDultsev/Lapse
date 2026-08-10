import { useQuery } from '@tanstack/react-query';
import { getUser } from '@entities/user';
import { userKeys } from './user.key';

export const useUser = (id: string) => {
    return useQuery({
        queryKey: userKeys.user(id),
        queryFn: () => getUser(id),
        enabled: !!id,
    });
};
