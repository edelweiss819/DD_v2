import React from 'react';
import styles from './Input.module.scss';

const Input: React.FC = () => (
    <div className={styles['search-input-container']}>
        <form>
            <input
                className={styles['search-input']}
                placeholder="Поиск.."
            />
        </form>
    </div>
);

export default Input;
