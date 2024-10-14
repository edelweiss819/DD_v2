import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/store.ts';
import styles from './SingleArticleContent.module.scss';
import Button, {
    ButtonColor,
    ButtonType
} from '../../../shared/ui/Button/Button.tsx';
import {
    generateLinkByGenre,
    splitContentIntoParagraphs
} from '../../../shared/utils';
import {GENRES_DIR} from '../../../constants';
import UserAvatar
    from '../../../features/auth/components/UserAvatar/UserAvatar.tsx';
import {useFetchUserAvatar} from '../../../features/auth/hooks';

const SingleArticleContent: React.FC = () => {
    const {singleArticle} = useSelector((state: RootState) => state.singleArticle);
    const paragraphs = (singleArticle.content && splitContentIntoParagraphs(singleArticle.content, 10));

    const {data: avatarData} = singleArticle.author ? useFetchUserAvatar(singleArticle.author.index) : {data: null};
    const avatarUrl = avatarData?.avatarUrl || 'defaultAvatar';
    const userIndex = avatarData?.userIndex || -1;

    return (
        <main className={styles['main-section']}>
            <div className={styles['main-section-content-container']}>
                <div
                    className={styles['main-section-content-container-author-block']}>
                    {singleArticle.author ? (
                        <>
                            <UserAvatar avatarUrl={avatarUrl}
                                        userIndex={userIndex}/>
                            {singleArticle.author.name}
                        </>
                    ) : (
                        <span>Author not found</span>
                    )}
                </div>
                <div
                    className={styles['main-section-content-container-genres-block']}>
                    {singleArticle.genres && singleArticle.genres.map((genre) => (
                        <Button
                            text={genre}
                            type={ButtonType.ROUNDED_SMALL}
                            color={ButtonColor.GREY}
                            key={genre}
                            to={`${GENRES_DIR}${generateLinkByGenre(genre)}`}
                        />
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
