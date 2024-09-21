import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';


export interface IFetchTotalArticlesCountByGenreAndWords {
    page: number;
    limit?: number;
    genres?: string;
    s?: string;

}


export const fetchTotalArticlesCountByGenreAndWords = async ({
                                                                 page,
                                                                 limit,
                                                                 genres,
                                                                 s
                                                             }: IFetchTotalArticlesCountByGenreAndWords): Promise<number> => {
    const res = await axiosInstance.get(API_ROUTES.TOTAL_ARTICLES_COUNT_BY_GENRE_AND_WORDS, {
        params: {
            page,
            limit: limit ?? 10,
            genres,
            s,
        }
    })
    console.log('Response from API:', res.data);
    return res.data
}