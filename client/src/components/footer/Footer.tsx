import React from 'react';
import TelegramIcon from '../../assets/Icons/TelegramIcon.tsx';
import GitHubIcon from '../../assets/Icons/GitHubIcon.tsx';
import styles from './Footer.module.scss'

const Footer: React.FC = () => (
    <footer className={styles.footer}>
        <p>
            Если вам меньше 18 лет - покиньте сайт.
        </p>
        <div className={styles['footer-icons-container']}>
            <TelegramIcon/>
            <GitHubIcon/>
        </div>
    </footer>

);

export default Footer;