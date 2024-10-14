import {axiosInstance} from '../../../config/axiosConfig';
import {API_ROUTES} from '../../../config/endpoints';

export interface IFetchUserAvatarRes {
    userIndex: number;
    avatarUrl: string;
}

export const fetchUserAvatar = async (index: number): Promise<IFetchUserAvatarRes> => {
    const res = await axiosInstance.get<IFetchUserAvatarRes>(API_ROUTES.GET_USER_AVATAR, {
        params: {
            index: index,
        },
    });

    return res.data;
}
