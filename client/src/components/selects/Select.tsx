import React from 'react';
import styles from './Select.module.scss'

interface Option {
    value: string;
    label: string;
}

interface SelectProps {
    options: Array<Option>;
    value: string;
    onChange?: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
                                           options,
                                           value,
                                           onChange
                                       }) => (
    <div>
        <select
            className={styles.select}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    </div>
);

export default Select;
