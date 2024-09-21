import {useQuery} from '@tanstack/react-query';
import {IArticle} from '../../../types';
import {
    fetchArticlesListByGenreAndWords,
    IFetchArticlesListByGenreAndWordsParams
} from '../api';


export const useFetchArticlesListByGenreAndWords = (
    params: IFetchArticlesListByGenreAndWordsParams | null
) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               fetchArticlesListByGenreAndWords,
                                               params
                                           ],
                                           queryFn: async () => fetchArticlesListByGenreAndWords(params),
                                           retry: 1,
                                       })
}