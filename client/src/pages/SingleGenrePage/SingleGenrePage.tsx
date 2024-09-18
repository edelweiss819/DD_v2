import React, {useEffect, useRef} from 'react';
import Content from '../../components/Content/Content.tsx';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useParams} from 'react-router';
import {
    useFetchArticlesListByGenre
} from '../../features/articles/hooks/useFetchArticlesListByGenre.ts';
import {
    setArticlesList, setCurrentPage, setTotalPages
} from '../../features/articles/slice/articlesListSlice.ts';
import {
    useFetchTotalArticlesCountByGenre
} from '../../features/pagination/hooks';
import {articlesCountToPagesCount, generateGenreByLink} from '../../utils';


export const SingleGenrePage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        articlesList,
        currentPage,
    } = useSelector((state: RootState) => state.articlesList);

    const {genre} = useParams<{ genre: string }>();

    useEffect(() => {
        const genreTitle = generateGenreByLink(genre);
        document.title = `DD || Жанры - ${genreTitle}`;
    }, [genre]);


    const {data: fetchedArticlesListByGenre} = useFetchArticlesListByGenre(currentPage, genre);


    const prevGenreRef = useRef<string, undefined>(genre);


    useEffect(() => {
        if (prevGenreRef.current !== genre) {
            dispatch(setCurrentPage(1));
            prevGenreRef.current = genre;
        }
    }, [
                  genre,
                  dispatch
              ]);

    useEffect(() => {
        if (fetchedArticlesListByGenre) {
            dispatch(setArticlesList(fetchedArticlesListByGenre));
        }

    }, [
                  dispatch,
                  fetchedArticlesListByGenre
              ]);

    const {data: fetchedTotalArticlesCountByGenre} = useFetchTotalArticlesCountByGenre(genre);


    useEffect(() => {
        if (fetchedTotalArticlesCountByGenre) {
            dispatch(setArticlesList(fetchedArticlesListByGenre));
            (fetchedTotalArticlesCountByGenre && dispatch(setTotalPages(articlesCountToPagesCount(fetchedTotalArticlesCountByGenre))));
        }
    }, [
                  dispatch,
                  fetchedArticlesListByGenre,
                  fetchedTotalArticlesCountByGenre,
              ]);


    return (
        <>
            <MainHeaderLayout/>
            <Content>
                <MainContentLayout articlesList={articlesList}
                                   totalCountArticlesByGenre={fetchedTotalArticlesCountByGenre}/>
            </Content>
            <Footer/>
        </>
    );
};

export default SingleGenrePage;
