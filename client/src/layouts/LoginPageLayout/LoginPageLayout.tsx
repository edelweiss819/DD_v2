import React from 'react';
import styles from './LoginPageLayout.module.scss'
import Logo from '../../shared/ui/Logo/Logo.tsx';
import Button from '../../shared/ui/Button/Button.tsx';

export interface LoginPageLayoutProps {
    children?: React.ReactNode;
}

const LoginPageLayout: React.FC<LoginPageLayoutProps> = ({children}) => {


    return (
        <div className={styles['main-wrapper']}>
            <div className={styles['container']}>
                <div className={styles['container-content-wrapper']}>
                    <Logo firstPartColor={'dark'} secondPartColor={'blue'}
                          to={'/'}/>
                    <div
                        className={styles['container-content-wrapper-h1']}>
                        Добро пожаловать на Desire Diaries 👋
                    </div>
                    <div
                        className={styles['container-content-wrapper-social-block']}>
                        <p className={styles['container-content-wrapper-social-block-p']}>Войти
                            с помощью вашей социальной сети:</p>
                        <div
                            className={styles['container-content-wrapper-social-block-buttons-block']}>
                            <Button text={'Google'}
                                    color={'white'} type={'medium-flex'}
                                    icon={'Google'}
                                    iconWidth={'24'}/>
                            <Button text={'Facebook'}
                                    color={'dark-blue'} type={'medium-flex'}
                                    icon={'Facebook'}
                                    iconWidth={'24'}/>
                        </div>
                    </div>
                    <p className={styles['container-content-wrapper-form-title']}>
                        Или создайте аккаунт:
                    </p>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LoginPageLayout;
