import {useQuery} from '@tanstack/react-query';
import {generateGenreByLink} from '../../../utils';
import {fetchTotalArticlesCountByGenre} from '../api';

export const useFetchTotalArticlesCountByGenre = (genreLink: string) => {
    return useQuery<number, Error>({
                                       queryKey: [
                                           'fetchTotalArticlesCountByGenre',
                                           genreLink
                                       ],
                                       queryFn: async () => {
                                           const genre = generateGenreByLink(genreLink);
                                           if (!genre) {
                                               throw new Error('Genre not found');
                                           }
                                           const encodedGenre = encodeURIComponent(genre);
                                           const res = await fetchTotalArticlesCountByGenre(encodedGenre);
                                           return res;
                                       },
                                       retry: 0,
                                   });
};
