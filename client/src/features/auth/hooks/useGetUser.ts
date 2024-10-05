import {useQuery} from '@tanstack/react-query';
import {getUser, IGetUserRes} from '../api';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store.ts';
import {setUser} from '../slice/userSlice.ts';
import {IUser} from '../../../types/users.ts';

type UserFieldKeys = keyof Partial<IUser> | 'fullUser';

export const useGetUser = (
    token: string,
    fields: UserFieldKeys[],
    userIndex?: number
) => {
    const dispatch = useDispatch<AppDispatch>();

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
                                                 throw new Error('Token is required');
                                             }

                                             return await getUser({
                                                                      token,
                                                                      fields: fieldsString,
                                                                      userIndex,
                                                                  });
                                         },
                                     });

    useEffect(() => {
        if (data) {
            console.log(data.message);
            dispatch(setUser(data.user));
        }
    }, [
                  data,
                  dispatch
              ]);

    return {
        data,
        error,
        isLoading,
    };
};
