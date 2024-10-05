import {useQuery} from '@tanstack/react-query';
import {fetchFavArticlesList, IFetchFavArticlesListResponse} from '../api';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../store/store';
import {setFavoriteArticles} from '../../auth/slice/userSlice.ts';

export const useFetchFavArticlesList = (token: string | undefined) => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        data,
        error,
        isLoading
    } = useQuery<IFetchFavArticlesListResponse, Error>({
                                                           queryKey: [
                                                               'favArticlesList',
                                                               token
                                                           ],
                                                           queryFn: async () => {
                                                               if (!token) {
                                                                   throw new Error('Token is required');
                                                               }
                                                               return await fetchFavArticlesList(token);
                                                           },
                                                           refetchInterval: 5000,
                                                       });

    useEffect(() => {
        if (data) {
            console.log(data.message);

            dispatch(setFavoriteArticles(data.favoriteArticles));
        }
    }, [
                  data,
                  dispatch
              ]);

    return {
        data,
        error,
        isLoading
    };
};
