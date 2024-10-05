import {axiosInstance} from '../../../config/axiosConfig.ts';
import {API_ROUTES} from '../../../config/endpoints.ts';

export const fetchTotalArticlesCount = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.GET_ARTICLES_TOTAL_COUNT);
        return response.data;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        throw error;
    }
};
