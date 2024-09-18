import React from 'react';
import styles from './MainContentLayout.module.scss';
import ArticlesList
    from '../../features/articles/components/ArticlesList/ArticlesList.tsx';
import {IArticlesList} from '../../types';
import Pagination from '../../features/pagination/components/Pagination.tsx';
import {Element} from 'react-scroll';
import {GENRES, GENRES_DIR} from '../../constants';
import {Link} from 'react-router-dom';
import {scrollToElement} from '../../utils';


export interface IMainPageContentProps extends IArticlesList {
    totalCountArticlesByGenre?: number;
}

const MainContentLayout: React.FC<IMainPageContentProps> = ({
                                                                articlesList,
                                                                totalCountArticlesByGenre
                                                            }) => {

    const handleClickToGenreLink = () => {
        scrollToElement('main')
    }


    return (
        <section className={styles['main-section']}>
            <div className={styles['content']}>
                <div className={styles['content-pos']}>
                    <aside>
                        <h3>Жанры</h3>
                        <hr/>
                        {Object.entries(GENRES).map(([genre, route]) => (
                            <div key={genre} className={styles.genre}>
                                <Link onClick={handleClickToGenreLink}
                                      to={`${GENRES_DIR}${route}`}
                                      key={genre}
                                      className={styles['genre-link']}>
                                    {genre}
                                </Link></div>
                        ))}
                    </aside>
                    <Element name="main" className={styles['main']}>
                        <main>
                            {totalCountArticlesByGenre &&
								<div className={styles['main-total-articles']}>
									Всего статей в жанре
									: {totalCountArticlesByGenre}
								</div>}
                            <p>Submitted by writers on Reedsy Prompts to our
                                weekly writing contest.</p>
                            <div className={styles['articles-list-container']}>
                                <span
                                    className={styles['articles-list-container-title']}>Recently featured</span>
                                <ArticlesList articlesList={articlesList}/>
                            </div>
                            <Pagination scrollTo={'main'}/>
                        </main>
                    </Element>
                </div>
            </div>
        </section>
    );
}

export default MainContentLayout;
