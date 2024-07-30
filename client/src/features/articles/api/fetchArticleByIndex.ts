import {axiosInstance} from '../../../config/axiosConfig.ts';

export const fetchArticleByIndex = async (index: string): Promise<any> => {
    const response = await axiosInstance.get(`/articles/${index}`);
    return response.data;
};