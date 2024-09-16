import React from 'react';
import SingleArticle from '../SingleArticle/SingleArticle.tsx';
import {IArticle, IArticlesList} from '../../../../types';
import styles from './ArticlesList.module.scss';
import {truncateText} from '../../../../utils';

const ArticlesList: React.FC<IArticlesList> = ({
                                                   articlesList,
                                                   onClick
                                               }) => (

    <div className={styles['articles-container']}>

        {articlesList.map((article: IArticle) => (
            <SingleArticle
                key={article.index}
                title={article.title}
                genres={article.genres}
                content={article.content && truncateText(article.content)}
                index={article.index}
                onClick={onClick ? () => onClick(article.index ?? 0) : undefined}
            />
        ))}
    </div>
);

export default ArticlesList;
