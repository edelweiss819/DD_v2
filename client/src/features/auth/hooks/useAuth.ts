import {useMutation, UseMutationResult} from '@tanstack/react-query';
import {auth, AuthResponse} from '../api';


interface AuthSuccessResponse {
    status: number;
    message: string;
    token: string;
}

interface Error {
    message: string;
    error: string;
    status?: number;
}

export const useAuth = (
    navigate: (path: string) => void,
    onSuccess?: (data: AuthSuccessResponse) => void,
    onError?: (error: Error) => void
): UseMutationResult<{
    status: number;
    message: any;
} | undefined, Error, AuthResponse> => {
    return useMutation({
                           mutationKey: ['auth'],
                           mutationFn: (authData: AuthResponse) => auth(authData),
                           onSuccess: (data) => {
                               console.log('onSuccess вызван с данными:', data);
                               if (data) {
                                   const {token} = data;
                                   if (token) {
                                       localStorage.setItem('token', token);
                                   }

                                   onSuccess && onSuccess(data);

                                   navigate('/');
                               }
                           },
                           onError: (error) => {
                               console.error('Ошибка при выполнении мутации:', error);
                               if (error.status === 400) {
                                   console.error('Ошибка 400:', error.message);
                               } else if (error.status === 401) {
                                   console.error('Ошибка 401:', error.message);
                               } else {
                                   console.error('Ошибка при регистрации пользователя:', error);
                               }

                               onError && onError(error);
                           },
                       });
};
