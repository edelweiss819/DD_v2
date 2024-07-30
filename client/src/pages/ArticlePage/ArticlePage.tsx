import React from 'react';
import {useParams} from 'react-router-dom';
import Header from '../../components/header/Header.tsx';
import MainContent from '../../components/mainContent/MainContent.tsx';
import Footer from '../../components/footer/Footer.tsx';
import {
    useFetchArticleByIndex
} from '../../features/articles/hooks/useFetchArticleByIndex.ts';
import styles from './ArticlePage.module.scss';

const ArticlePage: React.FC = () => {
    const {index} = useParams<{ index: string }>();
    const {data, error, isLoading} = useFetchArticleByIndex(index);

    return (
        <div>
            <Header/>
            <MainContent>
                <div className={styles.article}>
                    {isLoading && <div>Загрузка...</div>}
                    {error && <div>Ошибка: {error.message}</div>}
                    {!data && !isLoading && !error && <div>Нет данных</div>}
                    {data && (
                        <>
                            <div
                                className={styles['article-index']}>#{index}</div>
                            <div
                                className={styles['article-title']}>{data.title}</div>
                            <div className={styles['article-genres']}>
                                {data.genres.length > 0 ? data.genres.join(', ') :
                                    <div>Жанров не найдено.</div>}
                            </div>
                            <div
                                className={styles['article-content']}>{data.content}</div>
                        </>
                    )}
                </div>
            </MainContent>
            <Footer/>
        </div>
    );
};

export default ArticlePage;
