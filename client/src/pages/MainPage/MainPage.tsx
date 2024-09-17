import React, {useEffect} from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import MainPageContent from './MainPageContent/MainPageContent.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import HeaderContent
    from '../../components/Header/HeaderContent/HeaderContent.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../features/articles/hooks';
import {
    setArticlesList, setTotalPages
} from '../../features/articles/slice/articlesListSlice.ts';
import {articlesCountToPagesCount} from '../../utils';
import {
    useFetchTotalArticlesCount
} from '../../features/pagination/hooks';
import Content from '../../components/Content/Content.tsx';

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        document.title = 'Desire Diaries';
    }, []);

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
            (fetchedTotalArticlesCount && dispatch(setTotalPages(articlesCountToPagesCount(fetchedTotalArticlesCount))));
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
            <Content>
                <MainPageContent articlesList={articlesList}/>
            </Content>
            <Footer/>
        </>
    );
};

export default MainPage;
