import {IUser} from '../../../types/users.ts';
import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';


export interface IGetAllUsersReq {
    token: string;
    fields: string;
    limit: number;
    page: number;
    sortBy?: string;
    sortIndex?: number;
}

export interface IGetAllUsersRes {
    message: string;
    users: Partial<IUser>[];
}

export const getAllUsers = async ({
                                      token,
                                      fields,
                                      limit,
                                      page,
                                      sortBy,
                                      sortIndex
                                  }: IGetAllUsersReq): Promise<IGetAllUsersRes> => {
    const response = await axiosInstance.get(API_ROUTES.GET_ALL_USERS, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            'user-fields': fields,
            limit,
            page,
            ...(sortBy && {sortBy}),
            ...(sortIndex !== undefined && {sortIndex})
        }
    });

    return response.data;
};
