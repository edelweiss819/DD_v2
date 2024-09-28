import {
    IRegistrationForm
} from '../components/RegistationForm/RegistrationForm.tsx';
import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import axios from 'axios';

export type AuthResponse = Pick<IRegistrationForm, 'email' | 'password'>

export const auth = async (authData: AuthResponse) => {
    try {
        const response = await axiosInstance.post(API_ROUTES.AUTH, authData);
        console.log('Response от сервера:', response.data);
        return response.data;
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
