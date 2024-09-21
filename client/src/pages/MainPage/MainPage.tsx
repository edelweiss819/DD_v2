import React, {useEffect} from 'react';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../features/articles/hooks';
import {
    setArticlesList, setTotalPages
} from '../../features/articles/slice/articlesListSlice.ts';
import {articlesCountToPagesCount} from '../../utils';
import {
    useFetchTotalArticlesCount,
} from '../../features/pagination/hooks';
import Content from '../../components/Content/Content.tsx';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';
import {
    useFetchArticlesListByGenreAndWords,
    useFetchTotalArticlesCountByGenreAndWords
} from '../../features/search/hooks';

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        document.title = 'Desire Diaries ';
    }, []);

    const {
        articlesList,
        currentPage,
        isSearchActive,
        searchParams
    } = useSelector((state: RootState) => state.articlesList);

    const {data: fetchedArticleList} = useFetchArticlesList(isSearchActive ? 1 : currentPage);
    const {
        data: fetchedTotalArticlesCount,
    } = useFetchTotalArticlesCount();


    const {data: fetchedArticleListByGenreAndWords} = useFetchArticlesListByGenreAndWords(
        isSearchActive
            ? {
                page: currentPage,
                genres: searchParams?.genres,
                s: searchParams?.s,
            }
            : null
    );


    const {data: foundArticlesCount} = useFetchTotalArticlesCountByGenreAndWords(
        isSearchActive && currentPage === 1
            ? {
                page: currentPage,
                genres: searchParams?.genres,
                s: searchParams?.s,
            }
            : null
    );


    useEffect(() => {

        if (fetchedArticleList && !isSearchActive) {
            dispatch(setArticlesList(fetchedArticleList));
            (fetchedTotalArticlesCount && dispatch(setTotalPages(articlesCountToPagesCount(fetchedTotalArticlesCount))));
        } else {
            (foundArticlesCount && dispatch(setTotalPages(articlesCountToPagesCount(foundArticlesCount))));
            (fetchedArticleListByGenreAndWords && dispatch(setArticlesList(fetchedArticleListByGenreAndWords)));
        }
    }, [
                  dispatch,
                  fetchedArticleList,
                  fetchedTotalArticlesCount,
                  isSearchActive,
                  fetchedArticleListByGenreAndWords,
                  foundArticlesCount,
              ]);


    return (
        <>
            <MainHeaderLayout/>
            <Content>
                <MainContentLayout articlesList={articlesList}/>
            </Content>
            <Footer/>
        </>
    );
};

export default MainPage;
