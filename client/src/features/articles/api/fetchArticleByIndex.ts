import {axiosInstance} from '../../../config/axiosConfig.ts';
import {IArticle} from '../../../types';

export const fetchArticleByIndex = async (index: string): Promise<IArticle> => {
    const response = await axiosInstance.get(`/articles/${index}`);
    return response.data;
};