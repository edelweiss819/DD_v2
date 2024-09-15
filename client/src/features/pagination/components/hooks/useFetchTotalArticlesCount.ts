import {useQuery} from '@tanstack/react-query';
import {fetchTotalArticlesCount} from '../api';

export const useFetchTotalArticlesCount = () => {
    return useQuery({
                        queryKey: ['fetchTotalArticlesCount'],
                        queryFn: fetchTotalArticlesCount,
                        retry: 0,
                    });
};
