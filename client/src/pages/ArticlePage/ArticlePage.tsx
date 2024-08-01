import React, {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/Header.tsx';
import MainContent from '../../components/mainContent/MainContent.tsx';
import Footer from '../../components/footer/Footer.tsx';
import styles from './ArticlePage.module.scss';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../store/store.ts';
import {
    loadSingleArticleByIndex
} from '../../features/articles/slice/singleArticleSlice.ts';


const ArticlePage: React.FC = () => {
    const {index} = useParams<{ index: string }>();
    const dispatch = useDispatch<AppDispatch>();
    const {
        article,
        isLoading,
        isError,
        errorMessage
    } = useSelector((state: RootState) => state.singleArticle);

    useEffect(() => {
        if (index) {
            dispatch(loadSingleArticleByIndex(index));
        }
    }, [index, dispatch]);

    return (
        <div>
            <Header/>
            <MainContent>
                <div className={styles.article}>
                    {isError && <div>Ошибка: {errorMessage}</div>}
                    {!article && !isError && <div>Нет данных</div>}
                    {article && (
                        <>
                            <div
                                className={styles['article-index']}>#{index}</div>
                            <div
                                className={styles['article-title']}>{article.title}</div>
                            <div className={styles['article-genres-container']}>
                                {article.genres && article.genres.map((genre, index) => (
                                    <div key={index}
                                         className={styles['article-single-genre']}>
                                        {genre}
                                    </div>
                                ))}
                            </div>
                            <div
                                className={styles['article-content']}>{article.content}</div>
                            {isLoading && <div>Загрузка...</div>}
                        </>
                    )}
                </div>
            </MainContent>
            <Footer/>
        </div>
    );
};

export default ArticlePage;
