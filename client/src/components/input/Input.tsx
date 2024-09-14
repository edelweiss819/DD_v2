import React from 'react';
import styles from './Input.module.scss';


export interface InputProps {
    placeholder?: string,
    value?: string | number,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input: React.FC<InputProps> = ({placeholder, onChange}) => (
    <>
        <form>
            <input
                className={styles['search-Input']}
                placeholder={placeholder}
                onChange={onChange}
            />
        </form>
    </>

);

export default Input;
