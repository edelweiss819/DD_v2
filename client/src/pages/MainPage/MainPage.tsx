import React, {useEffect, useCallback} from 'react';
import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import MainContent from '../../components/mainContent/MainContent.tsx';
import ArticlesList
    from '../../features/articles/components/articlesList/ArticlesList.tsx';

import {useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../../store/store.ts';
import {loadArticles} from '../../features/articles/slice/articlesSlice';

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {
        articles,
        isLoading,
        isError,
        hasNextPage,
        nextPage
    } = useSelector((state: RootState) => state.articles);

    useEffect(() => {
        if (nextPage === 1) {
            dispatch(loadArticles(nextPage));
        }
    }, [dispatch, nextPage]);

    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        if (scrollTop + windowHeight >= documentHeight - 100) {
            if (hasNextPage && !isLoading) {
                dispatch(loadArticles(nextPage));
            }
        }
    }, [dispatch, hasNextPage, isLoading, nextPage]);

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
                {!isError &&
					<ArticlesList
						articlesList={articles}
						onClick={handleClickOnArticle}
					/>}
                {isLoading && <div>Загрузка...</div>}
            </MainContent>
            <Footer/>
        </div>
    );
};

export default MainPage;
