import {useQuery} from '@tanstack/react-query';
import {IGetAllUsersRes, IGetAllUsersReq, getAllUsers} from '../api';

export const useGetAllUsers = ({
                                   token,
                                   fields,
                                   limit,
                                   page,
                                   sortBy,
                                   sortIndex,
                               }: IGetAllUsersReq) => {
    const {
        data,
        isLoading,
        error,
    } = useQuery<IGetAllUsersRes, Error>({
                                             queryKey: [
                                                 'getAllUsers',
                                                 token,
                                                 page,
                                                 fields,
                                                 sortBy,
                                                 sortIndex
                                             ],
                                             queryFn: async () => {
                                                 if (!token) {
                                                     throw new Error('Токен обязателен');
                                                 }
                                                 return await getAllUsers({
                                                                              token,
                                                                              fields,
                                                                              limit,
                                                                              page,
                                                                              sortBy,
                                                                              sortIndex,
                                                                          });
                                             },
                                         });

    return {
        data,
        isLoading,
        error,
    };
};
