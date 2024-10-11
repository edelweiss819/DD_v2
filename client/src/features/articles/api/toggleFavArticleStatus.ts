import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import {FavoriteArticlesList} from '../../../types/users.ts';

export interface IToggleArticleFavStatusResponse {
    message: string;
    favoriteArticles: FavoriteArticlesList
}


export const toggleFavArticleStatus = async (
    index: number,
    token: string
): Promise<IToggleArticleFavStatusResponse> => {
    try {
        const response = await axiosInstance.post(API_ROUTES.POST_TOGGLE_ARTICLE_STATUS, {
            index,
            token
        });

        return response.data;
    } catch (error) {
        console.error('Error toggling favorite article status:', error);
        throw error;
    }
};
