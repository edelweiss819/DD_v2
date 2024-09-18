import {useQuery} from '@tanstack/react-query';
import {fetchArticlesListByGenre} from '../api';
import {IArticle} from '../../../types';
import {generateGenreByLink} from '../../../utils';

export const useFetchArticlesListByGenre = (page: number, genreLink: string,
                                            limit?: number) => {
    return useQuery<IArticle[], Error>({
                                           queryKey: [
                                               'fetchArticlesListByGenre',
                                               genreLink,
                                               page,
                                               limit
                                           ],
                                           queryFn: async () => {

                                               const genre = generateGenreByLink(genreLink);

                                               if (!genre) {
                                                   throw new Error('Genre not found');
                                               }


                                               const encodedGenre = encodeURIComponent(genre);


                                               const res = await fetchArticlesListByGenre({
                                                                                              genre: encodedGenre,
                                                                                              page,
                                                                                              limit
                                                                                          });
                                               return res;
                                           },
                                           retry: 0,
                                       });
}
