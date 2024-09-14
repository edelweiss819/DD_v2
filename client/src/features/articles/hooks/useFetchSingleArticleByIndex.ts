import {useQuery} from '@tanstack/react-query';
import {fetchArticlesList} from '../api';
import {IArticle} from '../../../types';

export const useFetchSingleArticleByIndex = (index: string | undefined) => {
    return useQuery<IArticle, Error>({
                                         queryKey: [
                                             'fetchSingleArticleByIndex',
                                             index
                                         ],
                                         queryFn: () => {
                                             if (!index) {
                                                 return Promise.reject(new Error('Index is required'));
                                             }
                                             return fetchArticlesList(index);
                                         },
                                         retry: 0,
                                         enabled: !!index
                                     });
};
