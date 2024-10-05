import {IUser} from '../../../types/users.ts';
import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';

export interface IGetUserReq {
    token: string;
    fields: string;
    userIndex?: number;
}

export interface IGetUserRes {
    message: string;
    user: Partial<IUser>;
}

export const getUser = async ({
                                  token,
                                  fields,
                                  userIndex
                              }: IGetUserReq): Promise<IGetUserRes> => {
    const response = await axiosInstance.get(API_ROUTES.GET_USER, {
        headers: {
            Authorization: `Bearer ${token}`,
            'user-fields': fields,
            ...(userIndex !== undefined && {'user-index': userIndex.toString()})
        }
    });

    return response.data;
};
