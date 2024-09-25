import React from 'react';
import SingleArticle from '../SingleArticle/SingleArticle';
import {IArticle, IArticlesList} from '../../../../types';
import styles from './ArticlesList.module.scss';
import {truncateText} from '../../../../shared/utils';


const ArticlesList: React.FC<IArticlesList> = ({
                                                   articlesList,
                                               }) => {
    return (
        <div className={styles['articles-container']}>
            {Array.isArray(articlesList) ? (
                articlesList.map((article: IArticle) => (
                    <SingleArticle
                        key={article.index}
                        title={article.title}
                        genres={article.genres}
                        content={article.content ? truncateText(article.content) : ''}
                        index={article.index}
                    />
                ))
            ) : (
                <div>No articles found.</div>
            )}
        </div>
    );
};

export default ArticlesList;

