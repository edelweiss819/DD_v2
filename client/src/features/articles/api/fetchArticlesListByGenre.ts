import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';
import {IArticle} from '../../../types';
import {IFetchArticlesListParams} from './fetchArticlesList.ts';

export interface IFetchArticlesListByGenreParams extends IFetchArticlesListParams {
    genre: string;
}

export const fetchArticlesListByGenre = async ({
                                                   page,
                                                   limit,
                                                   genre
                                               }: IFetchArticlesListByGenreParams): Promise<IArticle[]> => {
    const res = await axiosInstance.get(API_ROUTES.ARTICLES_LIST_BY_GENRE.replace(':genre', genre), {
        params: {
            page,
            limit: limit ?? 10
        }
    })
    return res.data;

}