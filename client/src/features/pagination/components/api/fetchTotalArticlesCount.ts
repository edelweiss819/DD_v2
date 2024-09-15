import {axiosInstance} from '../../../../config/axiosConfig';
import {API_ROUTES} from '../../../../config/endpoints';

export const fetchTotalArticlesCount = async () => {
    try {
        const response = await axiosInstance.get(API_ROUTES.ARTICLES_TOTAL_COUNT);
        return response.data;
    } catch (error) {
        console.error('Error fetching metadata:', error);
        throw error;
    }
};
