import {axiosInstance} from '../../../config/axiosConfig';
import {IArticle} from '../../../types';
import {API_ROUTES} from '../../../config/endpoints.ts';

export interface IFetchArticlesListParams {
    page: number;
    limit?: number;
}

export const fetchArticlesList = async ({
                                            page,
                                            limit
                                        }: IFetchArticlesListParams): Promise<IArticle[]> => {
    const response = await axiosInstance.get(API_ROUTES.GET_ARTICLES_LIST, {
        params: {
            page,
            limit: limit ?? 10,
        },
    });

    if (Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Invalid response format');
    }
};
