import {useQuery} from '@tanstack/react-query';
import {getUser, IGetUserRes} from '../api';
import {IUser} from '../../../types/users.ts';

type UserFieldKeys = keyof Partial<IUser> | 'fullUser';

export const useGetOtherUser = (
    token: string,
    fields: UserFieldKeys[],
    userIndex?: number
) => {


    let fieldsString: string;


    if (fields.includes('fullUser')) {
        fieldsString = 'fullUser';
    } else {
        fieldsString = fields.join(',');
    }

    const {
        data,
        error,
        isLoading,
    } = useQuery<IGetUserRes, Error>({
                                         queryKey: [
                                             'getUser',
                                             token,
                                             fieldsString,
                                             userIndex
                                         ],
                                         queryFn: async () => {
                                             if (!token) {
                                                 throw new Error('Токен обязателен');
                                             }

                                             return await getUser({
                                                                      token,
                                                                      fields: fieldsString,
                                                                      userIndex,
                                                                  });
                                         },
                                     });

    return {
        data,
        error,
        isLoading,
    };
};
