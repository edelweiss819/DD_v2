import React from 'react';
import {IArticle} from '../../../../types';
import {truncateText} from '../../../../utils';
import styles from './SingleArticle.module.scss';
import Button from '../../../../components/Button/Button';
import {setCurrentArticleIndex} from '../../slice/singleArticleSlice';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store/store';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                               genres,
                                               index
                                           }) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleButtonClick = () => {
        (index && dispatch(setCurrentArticleIndex(index)));

    };

    return (
        <div className={styles['single-article-container']}>
            <div className={styles['single-article-title']}>Avatar "{title}" by
                Author
            </div>
            <div
                className={styles['single-article-genres']}>{genres?.join(', ').toUpperCase()}</div>
            <div className={styles['single-article-content']}>
                {content && truncateText(content)}
            </div>
            <div className={styles['single-article-button-container']}>
                <Button
                    text={'ЧИТАТЬ'}
                    type={'rounded-small'}
                    color={'blue'}
                    to={`articles/${index}`}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );
};

export default SingleArticle;
