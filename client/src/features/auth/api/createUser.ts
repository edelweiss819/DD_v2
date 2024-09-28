import axios from 'axios'; // Добавьте этот импорт
import {axiosInstance} from '../../../config/axiosConfig';
import {API_ROUTES} from '../../../config/endpoints';
import {IUser} from '../../../types/users';

export type CreateUserResponse = Omit<IUser, 'favoriteArticles' | 'index' | 'role'>;

export const createUser = async (userData: CreateUserResponse) => {
    try {
        await axiosInstance.post(API_ROUTES.USERS, userData);
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
}
