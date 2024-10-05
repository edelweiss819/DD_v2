import {axiosInstance} from '../../../config/axiosConfig';
import {API_ROUTES} from '../../../config/endpoints';
import {FavoriteArticlesList} from '../../../types/users';

export interface IFetchFavArticlesListResponse {
    message: string;
    favoriteArticles: FavoriteArticlesList;
}

export const fetchFavArticlesList = async (token: string): Promise<IFetchFavArticlesListResponse> => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_USER_FAV_ARTICLES_LIST, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении списка избранных статей:', error);
        throw error;
    }
};
