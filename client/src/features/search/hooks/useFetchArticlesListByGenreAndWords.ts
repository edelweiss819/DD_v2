import {useQuery} from '@tanstack/react-query';
import {IArticle} from '../../../types';
import {fetchArticlesListByGenreAndWords} from '../api';
import {IFetchArticlesListParams} from '../../articles/api';

export const useFetchArticlesListByGenreAndWords = (
    params: IFetchArticlesListParams
) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               fetchArticlesListByGenreAndWords,
                                               params
                                           ],
                                           queryFn: async () => fetchArticlesListByGenreAndWords(params),
                                           retry: 0,
                                       })
}