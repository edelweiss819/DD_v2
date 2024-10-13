import React from 'react';
import {IArticle} from '../../../../types';
import {truncateText} from '../../../../shared/utils';
import styles from './SingleArticle.module.scss';
import Button, {
    ButtonColor,
    ButtonType
} from '../../../../shared/ui/Button/Button';
import {setCurrentArticleIndex} from '../../slice/singleArticleSlice';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store';
import StarFavArticleIcon
    from '../../../../assets/FavIcons/StarFavArticleIcon.tsx';
import {useToggleFavArticleStatus} from '../../hooks';

const SingleArticle: React.FC<IArticle> = ({
                                               content,
                                               title,
                                               genres,
                                               index,
                                               author
                                           }) => {
    const dispatch = useDispatch<AppDispatch>();
    const {
        favoriteArticles,
        token: userToken,
        isAuthorized
    } = useSelector((state: RootState) => state.user);

    const isFavorite = () => {
        return favoriteArticles.some(article => Number(article.index) === index);
    };

    const handleButtonClick = () => {
        if (index) {
            dispatch(setCurrentArticleIndex(index));
        }
    };

    const mutation = useToggleFavArticleStatus();

    const handleFavIconClick = async () => {
        if (!userToken) {
            console.error('User token is not available');
            return;
        }

        try {
            await mutation.mutateAsync({
                                           index,
                                           token: userToken,
                                       });
        } catch (error) {
            console.error('Ошибка при изменении статуса избранного:', error);
        }
    };

    return (
        <div className={styles['single-article-container']}>
            <div className={styles['single-article-title']}>
                Avatar "{title}" by&nbsp;
                {author?.name || 'Неизвестный автор'}
            </div>
            <div className={styles['single-article-genres']}>
                {genres?.join(', ').toUpperCase()}
            </div>
            <div className={styles['single-article-content']}>
                {content && truncateText(content)}
            </div>
            <div className={styles['single-article-button-container']}>
                {isAuthorized && (
                    isFavorite() ? (
                        <div
                            className={styles['single-article-button-container-fav-block']}>
                            <div
                                className={styles['single-article-button-container-fav-block-fav-icon']}>
                                <StarFavArticleIcon color={'#FFD700'}
                                                    onClick={handleFavIconClick}/>
                            </div>
                            <span
                                className={styles['single-article-button-container-fav-block-text']}>Уже в избранном</span>
                        </div>
                    ) : (
                        <div
                            className={styles['single-article-button-container-fav-block']}>
                            <div
                                className={styles['single-article-button-container-fav-block-fav-icon']}>
                                <StarFavArticleIcon
                                    onClick={handleFavIconClick}/>
                            </div>
                            <span
                                className={styles['single-article-button-container-fav-block-text']}>Добавить в избранное</span>
                        </div>
                    )
                )}
                <Button
                    text={'ЧИТАТЬ'}
                    type={ButtonType.ROUNDED_SMALL}
                    color={ButtonColor.BLUE}
                    to={`/articles/${index}`}
                    onClick={handleButtonClick}
                />
            </div>
        </div>
    );

};

export default SingleArticle;
