import React from 'react';
import ButtonsBlock from '../buttonBlock/ButtonsBlock.tsx';
import styles from './Header.module.scss';
import Input from '../input/Input.tsx';
import SelectContainer from '../selectContainer/SelectContainer.tsx';
import {useNavigate} from 'react-router-dom';

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
                <Input/>
                <SelectContainer/>
            </div>
        </header>
    );
};

export default Header;
