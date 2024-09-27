import React from 'react';
import styles from './HeaderNavigation.module.scss';
import Button from '../../Button/Button.tsx';
import Logo from '../../Logo/Logo.tsx';
import {HEADER_NAVIGATION_PAGES} from '../../../../constants';
import {Link} from 'react-router-dom';

const HeaderNavigation: React.FC = () => {


    return (
        <nav className={styles.nav}>
            <div className={styles['nav-container']}>
                <Logo firstPartColor={'light'} secondPartColor={'blue'}
                      to={'/'}/>
                <div className={styles['nav-link-container']}>
                    {Object.entries(HEADER_NAVIGATION_PAGES).map(([pageName, route]) => (
                        <div key={pageName}>
                            <Link to={route}
                                  className={styles['nav-link']}>{pageName}
                            </Link>
                        </div>
                    ))}
                    <Button text={'Войти'} to={'/sign_in'} color={'blue'}
                            type={'nav-login'}/>
                </div>
            </div>
        </nav>
    );
};

export default HeaderNavigation;
