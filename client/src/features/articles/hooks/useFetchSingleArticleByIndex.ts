import {useQuery} from '@tanstack/react-query';
import {IArticle} from '../../../types';
import {fetchSingleArticleByIndex} from '../api';

export const useFetchSingleArticleByIndex = (index: string | number | undefined) => {
    return useQuery<IArticle, Error>({
                                         queryKey: [
                                             'fetchSingleArticleByIndex',
                                             index
                                         ],
                                         queryFn: () => {
                                             if (index === undefined) {
                                                 return Promise.reject(new Error('Index is required'));
                                             }
                                             const indexAsString = String(index);
                                             return fetchSingleArticleByIndex(indexAsString);
                                         },
                                         retry: 0,
                                         enabled: !!index
                                     });
};
