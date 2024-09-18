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
    useFetchTotalArticlesCount
} from '../../features/pagination/hooks';
import Content from '../../components/Content/Content.tsx';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';

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
            <MainHeaderLayout/>
            <Content>
                <MainContentLayout articlesList={articlesList}/>
            </Content>
            <Footer/>
        </>
    );
};

export default MainPage;
