import React from 'react';
import {IArticle} from '../../../types';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import styles from './SingleArticleContent.module.scss'
import Button, {
    ButtonColor,
    ButtonType
} from '../../../shared/ui/Button/Button.tsx';
import {
    generateLinkByGenre,
    splitContentIntoParagraphs
} from '../../../shared/utils';
import {GENRES_DIR} from '../../../constants';

export interface ISingleArticleContentProps {
    singleArticle: IArticle;
}

const SingleArticleContent: React.FC<ISingleArticleContentProps> = () => {
    const {singleArticle} = useSelector((state: RootState) => state.singleArticle);
    const paragraphs = (singleArticle.content && splitContentIntoParagraphs(singleArticle.content, 10));

//TODO Добавить аватар и автора, когда сделаю
    return (
        <main className={styles['main-section']}>
            <div className={styles['main-section-content-container']}>
                <div
                    className={styles['main-section-content-container-author-block']}>
                    Avatar Author
                </div>
                <div
                    className={styles['main-section-content-container-genres-block']}>
                    {singleArticle.genres && singleArticle.genres.map((genre) => (
                        <Button text={genre} type={ButtonType.ROUNDED_SMALL}
                                color={ButtonColor.GREY} key={genre}
                                to={`${GENRES_DIR}` + generateLinkByGenre(genre)}/>
                    ))}
                </div>
                <article
                    className={styles['main-section-content-container-single-article']}>
                    {paragraphs && paragraphs.map((paragraph, index) => (
                        <p className={styles.paragraph}
                           key={index}>{paragraph}</p>
                    ))}
                </article>
            </div>
        </main>
    );
};

export default SingleArticleContent;
