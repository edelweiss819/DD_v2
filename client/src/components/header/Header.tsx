import React from 'react';
import ButtonsBlock from '../buttonBlock/ButtonsBlock.tsx';
import styles from './Header.module.scss';
import {useNavigate} from 'react-router-dom';
import Search from '../../features/search/components/searchBar/SearchBar.tsx';

const Header: React.FC = () => {
    const navigate = useNavigate();

    const handleClickTitle = () => {
        navigate('/');
    };

    return (
        <header className={styles['header-wrapper']}>
            <div className={styles['header-upper-block-wrapper']}>
                <div className={styles['header-title']}
                     onClick={handleClickTitle}>
                    DesireDiaries
                </div>
                <ButtonsBlock/>
            </div>
            <div className={styles['header-content']}>
                <Search/>
            </div>
        </header>
    );
};

export default Header;
