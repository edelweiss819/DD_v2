import {axiosInstance} from '../../../config/axiosConfig.ts';
import {IArticle} from '../../../types';
import {API_ROUTES} from '../../../config/endpoints.ts';

export interface IFetchSingleArticleByIndexResponse {
    article: IArticle;
    authorInfo: {
        index: number;
        fullAuthorName: string;
    }
}

export const fetchSingleArticleByIndex = async (index: string): Promise<IFetchSingleArticleByIndexResponse> => {
    const response = await axiosInstance.get(API_ROUTES.GET_SINGLE_ARTICLE_BY_INDEX.replace(':index', index));
    return response.data;
};