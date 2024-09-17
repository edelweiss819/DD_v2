import React from 'react';
import styles from './SingleArticleHeader.module.scss'

export interface ISingleArticleHeaderProps {
    singleArticleTitle: string
}

const SingleArticleHeader: React.FC<ISingleArticleHeaderProps> = ({singleArticleTitle}) => {
    return (
        <section className={styles.container}>
            <div className={styles['title-block']}>
                <div className={styles['title-block-title']}>
                    {singleArticleTitle}
                </div>
            </div>
        </section>
    );
};

export default SingleArticleHeader;
