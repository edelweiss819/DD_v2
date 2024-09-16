import React from 'react';
import styles from './MainContent.module.scss';
import ArticlesList
    from '../../features/articles/components/ArticlesList/ArticlesList.tsx';
import {IArticlesList} from '../../types';
import Pagination from '../../features/pagination/components/Pagination.tsx';
import {Element} from 'react-scroll';

const MainContent: React.FC<IArticlesList> = ({articlesList}) => {

    const categories: string[] = [
        'Adventure',
        'African American',
        'American',
        'Asian American',
        'Bedtime',
        'Black',
        'Christian',
        'Christmas',
        'Coming of Age',
        'Contemporary',
        'Creative Nonfiction',
        'Crime',
        'Desi',
        'Drama',
        'East Asian',
        'Fantasy',
        'Fiction',
        'Friendship',
        'Funny',
        'Gay',
        'Happy',
        'High School',
        'Historical Fiction',
        'Holiday',
        'Horror',
        'Indigenous',
        'Inspirational',
        'Kids',
        'Latinx',
        'Lesbian',
        'LGBTQ+',
        'Middle School',
        'Mystery',
        'People of Color',
        'Romance',
        'Sad',
        'Science Fiction',
        'Speculative',
        'Suspense',
        'Teens & Young Adult',
        'Thriller',
        'Transgender',
        'Urban Fantasy',
        'Western'
    ];

    return (
        <section className={styles['main-section']}>
            <div className={styles['content']}>
                <div className={styles['content-pos']}>
                    <aside>
                        <h3>Categories</h3>
                        <hr/>
                        {categories.map((category) => (
                            <p key={category} className={styles.category}>
                                {category}
                            </p>
                        ))}
                    </aside>
                    <Element name="main" className={styles['main']}>
                        <main>
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

export default MainContent;
