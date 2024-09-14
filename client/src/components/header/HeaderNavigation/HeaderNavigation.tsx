import React from 'react';
import styles from './HeaderNavigation.module.scss';
import Button from '../../Button/Button.tsx';
import Logo from '../../Logo/Logo.tsx';

const HeaderNavigation: React.FC = () => {
    const navPages: string[] = [
        'Жанры',
        'Любимое',
        'Колесо',
        'Профиль'
    ];

    return (
        <nav className={styles.nav}>
            <div className={styles['nav-container']}>
                <Logo firstPartColor={'light'} secondPartColor={'blue'}
                      to={'/'}/>
                <div className={styles['nav-link-container']}>
                    {navPages.map((pageName) => (
                        <div key={pageName}>
                            <p className={styles['nav-link']}>{pageName}</p>
                        </div>
                    ))}
                    <Button text={'Login'} to={'/login'} color={'blue'}
                            type={'nav-login'}/>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavigation;
