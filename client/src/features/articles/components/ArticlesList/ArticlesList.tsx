import React from 'react';
import SingleArticle from '../SingleArticle/SingleArticle';
import {IArticle, IArticlesList} from '../../../../types';
import styles from './ArticlesList.module.scss';
import {truncateText} from '../../../../utils';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store.ts';


const ArticlesList: React.FC<IArticlesList> = ({
                                                   articlesList,
                                               }) => {

    // const {errorMessage} = useSelector((state: RootState) => state.articlesList)
    //
    // if (!articlesList || articlesList.length === 0) {
    //     return <div className={styles['error']}><span className={styles["error-text"]}>
    //         {errorMessage}
    //     </span></div>;
    // }

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
