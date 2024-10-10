import React, {useEffect} from 'react';
import MainContentLayout
    from '../../layouts/MainContentLayout/MainContentLayout.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {useFetchArticlesList} from '../../features/articles/hooks';
import {
    resetSearchParams,
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
    useEffect(() => {
        document.title = 'Desire Diaries';
    }, []);

    const {
        articlesList,
        currentPage,
    } = useSelector((state: RootState) => state.articlesList);


    const {data: defaultList} = useFetchArticlesList(currentPage);
    const {data: defaultTotalCount} = useFetchTotalArticlesCount();


    useEffect(() => {
        dispatch(resetSearchParams());
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
