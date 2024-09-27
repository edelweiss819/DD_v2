import React from 'react';
import {UseFormRegister, FieldValues, Path} from 'react-hook-form';
import classNames from 'classnames';
import styles from './Input.module.scss'

export interface InputProps<T extends FieldValues> {
    register: UseFormRegister<T>;
    name: Path<T>;
    required?: boolean;
    placeholder?: string;
    type: 'input-search' | 'registration-form';
}

const Input = <T extends FieldValues>({
                                          register,
                                          name,
                                          required,
                                          placeholder,
                                          type,
                                      }: InputProps<T>): React.ReactElement => {
    const inputClass = classNames(styles['input'], {
        [styles['input-search']]: type === 'input-search',
        [styles['input-registration-form']]: type === 'registration-form',
    })

    return (
        <input
            className={inputClass}
            {...register(name, {required})}
            placeholder={placeholder || ''}
        />
    );
};

export default Input;
