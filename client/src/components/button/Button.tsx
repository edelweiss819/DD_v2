import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps {
    onClick?: () => void;
    text: string;
    color: 'green' | 'red' | 'blue';
}

const Button: React.FC<ButtonProps> = ({
                                           onClick,
                                           text,
                                           color
                                       }) => {
    const buttonClass = clsx(
        styles.button,
        styles[`button--${color}`]
    );

    return (
        <div className={buttonClass} onClick={onClick}>
            {text}
        </div>
    );
};

export default Button;
