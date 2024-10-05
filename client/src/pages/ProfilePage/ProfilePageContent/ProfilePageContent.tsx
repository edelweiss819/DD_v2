import React, {useState} from 'react';
import styles from './ProfilePageContent.module.scss';
import Button from '../../../shared/ui/Button/Button.tsx';
import {
    useFetchFavArticlesList
} from '../../../features/articles/hooks/useFetchFavArticlesList.ts';
import {useFetchUserLastArticlesList} from '../../../features/articles/hooks';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import ArticleLink from './ArticleLink.tsx/ArticleLink.tsx';
import {timestampToLocalDate} from '../../../shared/utils';
import {useGetUser} from '../../../features/auth/hooks/useGetUser.ts';

const ProfilePageContent: React.FC = () => {
    const [isFavoriteViewMode, setIsFavoriteViewMode] = useState<boolean>(true);

    const {
        token,
        favoriteArticles,
        lastArticles
    } = useSelector((state: RootState) => state.user);

    useGetUser(token!, [
        'lastArticles',
        'favoriteArticles'
    ]);
    // useFetchFavArticlesList(token);
    // useFetchUserLastArticlesList(token);

    const sortedLastArticles = Array.isArray(lastArticles) ? lastArticles.slice().sort((a,
                                                                                        b) => {
        return b.timestamp - a.timestamp;
    }) : [];

    const articlesGroupedByDate: {
        [date: string]: typeof sortedLastArticles
    } = {};

    sortedLastArticles.forEach(article => {
        const dateKey = timestampToLocalDate(article.timestamp);
        if (!articlesGroupedByDate[dateKey]) {
            articlesGroupedByDate[dateKey] = [];
        }
        articlesGroupedByDate[dateKey].push(article);
    });

    return (
        <section className={styles['main-section']}>
            <div className={styles['main-section-tabs']}>
                <div className={styles['main-section-tabs-container']}>
                    <Button text={'Любимые'} type={'medium'} color={'blue'}
                            onClick={() => setIsFavoriteViewMode(true)}/>
                    <Button text={'Последние'} type={'medium'}
                            color={'dark-blue'}
                            onClick={() => setIsFavoriteViewMode(false)}/>
                </div>
            </div>
            <div className={styles['main-section-content-container']}>
                {isFavoriteViewMode ? (
                    favoriteArticles.length > 0 ? (
                        favoriteArticles.map((article, index) => (
                            <ArticleLink title={article.title}
                                         index={article.index}
                                         key={index}/>
                        ))
                    ) : (
                        <p>У вас еще нет любимых статей.</p>
                    )
                ) : (
                    Object.keys(articlesGroupedByDate).length > 0 ? (
                        Object.keys(articlesGroupedByDate).map((dateKey,
                                                                index) => (
                            <div key={index}>
                                <div
                                    className={styles['main-section-content-container-date']}>{dateKey}</div>
                                {articlesGroupedByDate[dateKey].map((article,
                                                                     articleIndex) => (
                                    <ArticleLink title={article.title}
                                                 index={article.index}
                                                 key={articleIndex}/>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p>Вы еще не читали ни одной статьи.</p>
                    )
                )}
            </div>
        </section>
    );
};

export default ProfilePageContent;
