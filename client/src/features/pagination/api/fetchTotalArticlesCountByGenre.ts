import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';

export const fetchTotalArticlesCountByGenre = async (genre: string): Promise<number> => {
    const res = await axiosInstance.get(API_ROUTES.ARTICLES_TOTAL_COUNT_BY_GENRE.replace(':genre', genre));
    return res.data;

}