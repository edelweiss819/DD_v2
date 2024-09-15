import React from 'react';
import {IArticle} from '../../../../types';
import {truncateText} from '../../../../utils';
import styles from './SingleArticle.module.scss'
import Button from '../../../../components/Button/Button.tsx';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                               genres,
                                               index,
                                           }) => {

    //TODO Добавить автора и аватарку, после того как сделаю бэк
    return (
        <div className={styles['single-article-container']}>
            <div className={styles['single-article-title']}>Avatar "{title}" by
                Author
            </div>
            <div
                className={styles['single-article-genres']}>{genres?.join(', ').toUpperCase()}</div>
            <div
                className={styles['single-article-content']}>{content && truncateText(content)}
            </div>
            <div className={styles['single-article-button-container']}>
                <Button text={'ЧИТАТЬ'} type={'rounded-small'}
                        color={'blue'} to={`articles/${index}`}/>
            </div>
        </div>
    );
};

export default SingleArticle;
