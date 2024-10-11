import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import {IFetchArticlesListParams} from '../../articles/api';
import {IFetchArticlesResponse} from '../hooks';

export interface IFetchArticlesListByGenreAndWordsParams extends IFetchArticlesListParams {
    genres?: string | undefined;
    s?: string | undefined;
    lastCursor?: number;
    sortOrder?: number

}


export const fetchArticlesListByGenreAndWords = async ({
                                                           page,
                                                           limit,
                                                           genres,
                                                           lastCursor,
                                                           s,
                                                           sortOrder
                                                       }: IFetchArticlesListByGenreAndWordsParams): Promise<IFetchArticlesResponse> => {
    const res = await axiosInstance.get(API_ROUTES.GET_SEARCH_ARTICLES_BY_GENRE_AND_WORDS, {
        params: {
            page,
            limit: limit ?? 10,
            lastCursor,
            genres,
            s,
            sortOrder: sortOrder ?? 1
        }
    })
    return res.data
}