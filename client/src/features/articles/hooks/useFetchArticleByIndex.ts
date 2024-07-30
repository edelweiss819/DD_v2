import {useQuery} from '@tanstack/react-query';
import {fetchArticleByIndex} from '../api';

export const useFetchArticleByIndex = (index: any) => {
    return useQuery({
        queryKey: ['fetchArticleByIndex'],
        queryFn: () => fetchArticleByIndex(index),
        retry: 1
    });
};
