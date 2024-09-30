import React from 'react';
import styles from './ProfilePageContent.module.scss';


const ProfilePageContent: React.FC = () => {


    return (
        <section className={styles['main-section']}>
            <div className={styles['main-section-tabs']}>
                <div
                    className={styles['main-section-tabs-container']}>
                    <div>Любимые</div>
                    <div>Последние</div>
                </div>
            </div>
            <div className={styles['main-section-content-container']}>
                <div className={styles['main-section-content-container-title']}>

                </div>
                <div
                    className={styles['main-section-content-container-email']}>

                </div>

            </div>
        </section>
    );
};

export default ProfilePageContent;
