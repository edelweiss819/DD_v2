import React, {useEffect, useCallback} from 'react';
import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import MainContent from '../../components/mainContent/MainContent.tsx';
import ArticlesList
    from '../../features/articles/components/articlesList/ArticlesList.tsx';
import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store/store.ts';
import {
    loadArticles,
    loadFilteredArticles
} from '../../features/articles/slice/articlesSlice';

const MainPage: React.FC = () => {
    const searchParameters = useSelector((state: RootState) => state.articles.searchParameters);
    const {
        articles,
        isLoading,
        isError,
        hasNextPage,
        nextPage,
        filteredHasNextPage,
        filteredNextPage
    } = useSelector((state: RootState) => state.articles);

    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    
    useEffect(() => {
        if (nextPage === 1 && !searchParameters) {
            dispatch(loadArticles(nextPage));
        }
    }, [dispatch, nextPage, searchParameters]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        // Проверяем, достигли ли мы конца страницы и идет ли загрузка
        if (scrollTop + windowHeight < documentHeight - 600 || isLoading) {
            return;
        }

        // Загружаем статьи в зависимости от фильтра
        if (searchParameters) {
            if (filteredHasNextPage) {
                dispatch(loadFilteredArticles({
                    p: searchParameters,
                    page: filteredNextPage
                }));
            }
        } else if (hasNextPage) {
            dispatch(loadArticles(nextPage));
        }
    }, [dispatch, hasNextPage, isLoading, nextPage, searchParameters, filteredHasNextPage, filteredNextPage]);

    // Добавляем и удаляем обработчик прокрутки
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    const handleClickOnArticle = (index: number) => {
        navigate(`/articles/${index}`);
    };

    return (
        <div>
            <Header/>
            <MainContent>
                {isError &&
					<div>Ошибка загрузки статей. Попробуйте позже.</div>}
                <ArticlesList articlesList={articles}
                              onClick={handleClickOnArticle}/>
                {isLoading && <div>Загрузка...</div>}
            </MainContent>
            <Footer/>
        </div>
    );
};

export default MainPage;
