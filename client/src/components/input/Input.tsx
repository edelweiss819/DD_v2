import React from 'react';
import styles from './Input.module.scss';
import Button from '../button/Button.tsx';


const Input: React.FC = () => (
    <div className={styles['search-input-container']}>
        <form>
            <input
                className={styles['search-input']}
                placeholder="Поиск.."
            />
            <Button text={'Поиск'} color={'search'}/>
        </form>
    </div>
);

export default Input;
