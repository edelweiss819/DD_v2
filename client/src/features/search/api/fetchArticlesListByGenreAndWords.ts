import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import {IFetchArticlesListParams} from '../../articles/api';
import {IArticle} from '../../../types';

export interface IFetchArticlesListByGenreAndWordsParams extends IFetchArticlesListParams {
    genres?: string;
    s?: string;

}


export const fetchArticlesListByGenreAndWords = async ({
                                                           page,
                                                           limit,
                                                           genres,
                                                           s
                                                       }: IFetchArticlesListByGenreAndWordsParams): Promise<IArticle[]> => {
    const res = await axiosInstance.get(API_ROUTES.SEARCH_ARTICLES_BY_GENRE_AND_WORDS, {
        params: {
            page,
            limit: limit ?? 10,
            genres,
            s,
        }
    })
    return res.data
}