import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import {IUser} from '../../../types/users.ts';

export type CreateUserResponse = Omit<IUser, 'favoriteArticles' | 'index ' | 'role' | 'index'>;


export const createUser = async (userData: CreateUserResponse) => {
    await axiosInstance.post(API_ROUTES.USERS, userData);

}