import {useQuery} from '@tanstack/react-query';
import {fetchArticlesList} from '../api';
import {IArticle} from '../../../types';

export const useFetchArticlesList = (page: number, limit?: number) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               'articlesList',
                                               page,
                                               limit
                                           ],
                                           queryFn: () => fetchArticlesList({
                                                                                page,
                                                                                limit
                                                                            }),
                                           retry: 0
                                       });
};
