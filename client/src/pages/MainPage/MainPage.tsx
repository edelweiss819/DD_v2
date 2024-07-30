import React, {useEffect} from 'react';
import Header from '../../components/header/Header.tsx';
import Footer from '../../components/footer/Footer.tsx';
import MainContent from '../../components/mainContent/MainContent.tsx';
import ArticlesList
    from '../../features/articles/components/articlesList/ArticlesList.tsx';
import useFetchArticles
    from '../../features/articles/hooks/useFetchArticles.ts';
import {useNavigate} from 'react-router-dom'; // 'react-router-dom', not 'react-router'

const MainPage: React.FC = () => {
    const navigate = useNavigate();
    const {
        articles,
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage
    } = useFetchArticles();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            if (scrollTop + windowHeight >= documentHeight - 400) {
                if (hasNextPage && !isLoading) {
                    fetchNextPage();
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchNextPage, hasNextPage, isLoading]);

    const handleClickOnArticle = (index: number) => {
        navigate(`/articles/${index}`);
    }

    return (
        <div>
            <Header/>
            <MainContent>
                {isLoading && <div>Загрузка...</div>}
                {isError &&
					<div>Ошибка загрузки статей. Попробуйте позже.</div>}
                {!isLoading && !isError &&
					<ArticlesList
						articlesList={articles}
						onClick={handleClickOnArticle}
					/>}
            </MainContent>
            <Footer/>
        </div>
    );
};

export default MainPage;
