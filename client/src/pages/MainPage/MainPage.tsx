import React, {useEffect} from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import MainContent from '../../components/MainContent/MainContent.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import HeaderContent
    from '../../components/Header/HeaderContent/HeaderContent.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../features/articles/hooks';
import {
    setArticlesList, setTotalPages
} from '../../features/articles/slice/articleListSlice.ts';
import {articlesCountToPagesCount} from '../../utils';
import {
    useFetchTotalArticlesCount
} from '../../features/pagination/components/hooks';

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        articlesList,
        currentPage
    } = useSelector((state: RootState) => state.articlesList);

    const {
        data: fetchedArticleList,
        isLoading,
        isError
    } = useFetchArticlesList(currentPage);

    const {
        data: fetchedTotalArticlesCount,
    } = useFetchTotalArticlesCount();

    useEffect(() => {
        if (fetchedArticleList) {
            dispatch(setArticlesList(fetchedArticleList));
            dispatch(setTotalPages(articlesCountToPagesCount(fetchedTotalArticlesCount)));
        }
    }, [
                  dispatch,
                  fetchedArticleList,
                  fetchedTotalArticlesCount,
              ]);


    // if (isLoading) {
    //     return <div>Loading...</div>;
    // }
    //
    // if (isError) {
    //     return <div>Error loading articles.</div>;
    // }

    return (
        <>
            <Header>
                <HeaderNavigation/>
                <HeaderContent/>
            </Header>
            <MainContent articlesList={articlesList}/>
            <Footer/>
        </>
    );
};

export default MainPage;
