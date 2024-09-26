import React, {useLayoutEffect, useEffect} from 'react';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../features/articles/hooks';
import {
    resetGlobalGenres,
    setArticlesList,
    setTotalPages
} from '../../features/articles/slice/articlesListSlice.ts';
import {articlesCountToPagesCount} from '../../shared/utils';
import {useFetchTotalArticlesCount} from '../../features/pagination/hooks';
import Content from '../../shared/ui/Content/Content.tsx';
import MainHeaderLayout
    from '../../layouts/MainHeaderLayout/MainHeaderLayout.tsx';

const MainPage: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {globalGenres} = useSelector((state: RootState) => state.articlesList);

    useEffect(() => {
        document.title = 'Desire Diaries';
    }, []);

    const {
        articlesList,
        currentPage,
    } = useSelector((state: RootState) => state.articlesList);

    useLayoutEffect(() => {
        console.log('Global genres reset:', globalGenres);
        dispatch(resetGlobalGenres());
    }, [dispatch]);


    const {data: defaultList} = useFetchArticlesList(currentPage);
    const {data: defaultTotalCount} = useFetchTotalArticlesCount();


    useEffect(() => {
        if (defaultList) {
            dispatch(setArticlesList(defaultList));
            defaultTotalCount && dispatch(setTotalPages(articlesCountToPagesCount(defaultTotalCount)));
        }
    }, [
                  dispatch,
                  defaultList,
                  defaultTotalCount,
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
