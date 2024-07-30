import {QueryFunctionContext, QueryKey} from '@tanstack/react-query';
import {axiosInstance} from '../../../config/axiosConfig.ts';


export type ArticlesPageQuery<T> = QueryFunctionContext<QueryKey, T>;


export const fetchArticles = async ({pageParam}: ArticlesPageQuery<number>) => {
    const pageSize = 10;
    const response = await axiosInstance.get('/articles', {
        params: {
            page: pageParam,
            limit: pageSize,
        },
    });

    return response.data;

};