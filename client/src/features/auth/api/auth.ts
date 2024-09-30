import {
    IRegistrationForm
} from '../components/RegistationForm/RegistrationForm.tsx';
import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import axios from 'axios';
import {FavoriteArticlesList} from '../../../types/users.ts';

export type AuthResponse = Pick<IRegistrationForm, 'email' | 'password'>;

export interface AuthResult {
    token: string;
    user: {
        firstName: string;
        lastName: string;
        email: string;
        registrationDate: number;
        favoriteArticles: FavoriteArticlesList
    };
}

export const auth = async (authData: AuthResponse): Promise<AuthResult> => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH, authData);

        const {
            token,
            user
        } = response.data;
        return {
            token,
            user
        };

    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                return Promise.reject({
                                          status: error.response.status,
                                          message: error.response.data.message || 'Неизвестная ошибка',
                                      });
            } else {
                return Promise.reject({
                                          status: 500,
                                          message: 'Ошибка сети или сервер не доступен',
                                      });
            }
        } else {
            return Promise.reject({
                                      status: 500,
                                      message: 'Произошла ошибка при добавлении пользователя.',
                                  });
        }
    }
};
