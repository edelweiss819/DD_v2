import React from 'react';
import styles from './Footer.module.scss';
import Logo from '../Logo/Logo.tsx';

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <div className={styles['Footer-content']}>
            <div className={styles['Footer-content-logo']}>
                <Logo firstPartColor={'dark'} secondPartColor={'blue'}
                      to={'/'}/>
            </div>
            <p className={styles['Footer-content-text']}>
                2024
            </p>
        </div>
    </footer>
);

export default Footer;


