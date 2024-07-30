import React from 'react';
import {IArticle} from '../../../../types';
import styles from './SingleArticle.module.scss';

const SingleArticle: React.FC<IArticle & {
    onClick: (index: number) => void
}> = ({
          title,
          genres,
          content,
          index,
          onClick
      }) => (
    <div className={styles['single-article']}>
        <div
            className={styles['single-article-title']}
            onClick={() => index !== undefined && onClick(index)}
        >
            {title}
        </div>
        <div
            className={styles['single-article-genres']}
        >
            {genres ? genres.join(', ') : 'Жанры не указаны'}
        </div>
        <div className={styles['single-article-content']}>
            {content}
        </div>
    </div>
);

export default SingleArticle;
