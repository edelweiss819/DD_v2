import {axiosInstance} from '../../../config';
import {IArticle} from '../model';
import {API_ROUTES} from '../../../config';

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
