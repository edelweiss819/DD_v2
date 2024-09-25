import {LoaderFunction} from 'react-router-dom';
import {
    useFetchArticlesListByGenreAndWords,
    useFetchTotalArticlesCountByGenreAndWords
} from '../../features/search/hooks';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {
    setArticlesList, setTotalPages
} from '../../features/articles/slice/articlesListSlice.ts';


export const searchPageLoader: LoaderFunction = async () => {
    const dispatch = useDispatch<AppDispatch>();
    const {searchParams} = useSelector((state: RootState) => state.articlesList);
    
    const {data: list} = useFetchTotalArticlesCountByGenreAndWords({searchParams});
    const {data: count} = useFetchArticlesListByGenreAndWords({searchParams});

    try {
        dispatch(setArticlesList(list));
        dispatch(setTotalPages(count));

    } catch (error) {
        console.error('Error in loader:', error);
        throw error;
    }
};
