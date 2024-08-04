import {IArticle} from '../../../types';
import {axiosInstance} from '../../../config/axiosConfig.ts';

export interface ISearchParameters {
    p: string;
    page: number;
}

export const fetchFilteredArticles = async (searchParams: ISearchParameters): Promise<IArticle[]> => {
    try {
        const response = await axiosInstance.get('/search', {
            params: {
                p: searchParams.p,
                page: searchParams.page
            }
        });

        return response.data;
    } catch (error) {
        console.error('Error fetching filtered articles:', error);
        throw error;
    }
}
