import React from 'react';
import SingleArticle from '../SingleArticle/SingleArticle';
import {IArticle, IArticlesList} from '../../../../types';
import styles from './ArticlesList.module.scss';
import {truncateText} from '../../../../utils';


const ArticlesList: React.FC<IArticlesList> = ({
                                                   articlesList,
                                               }) => {
    if (!articlesList || articlesList.length === 0) {
        return <div>No articles found.</div>;
    }

    return (
        <div className={styles['articles-container']}>
            {articlesList.map((article: IArticle) => (
                <SingleArticle
                    key={article.index}
                    title={article.title}
                    genres={article.genres}
                    content={article.content ? truncateText(article.content) : ''}
                    index={article.index}
                />
            ))}
        </div>
    );
};
export default ArticlesList;
