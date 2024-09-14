import {axiosInstance} from '../../../config/axiosConfig.ts';
import {IArticle} from '../../../types';
import {API_ROUTES} from '../../../config/endpoints.ts';

export const fetchSingleArticleByIndex = async (index: string): Promise<IArticle> => {
    const response = await axiosInstance.get(API_ROUTES.SINGLE_ARTICLE_BY_INDEX.replace(':index', index));
    return response.data;
};