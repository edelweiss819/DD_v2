import {axiosInstance} from '../../../config/axiosConfig';
import {IArticle} from '../../../types';


export const fetchArticles = async ({pageParam}: {
    pageParam: number
}): Promise<IArticle[]> => {
    const pageSize = 10;

    const response = await axiosInstance.get('/articles', {
        params: {
            page: pageParam,
            limit: pageSize,
        },
    });
    if (Array.isArray(response.data)) {
        return response.data;
    } else {
        throw new Error('Invalid response format');
    }
};
