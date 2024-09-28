import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames';

interface ButtonProps {

    text: string;
    to?: string;
    color?: 'blue' | 'grey' | 'dark-blue' | 'white'
    icon?: 'SignUpArrow' | 'Google' | 'Facebook';
    iconWidth?: number | string;
    type: 'small' | 'medium' | 'medium-flex' | 'large' | 'large-flex' | 'nav-login' | 'rounded-small' | 'search';
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           to,
                                           color,
                                           icon,
                                           iconWidth,
                                           type,
                                           onClick
                                       }) => {


    const colorClass = classNames({
                                      [styles['btn-blue']]: color === 'blue',
                                      [styles['btn-grey']]: color === 'grey',
                                      [styles['btn-white']]: color === 'white',
                                      [styles['btn-dark-blue']]: color === 'dark-blue',
                                  });

    const buttonClass = classNames(styles['btn'], colorClass, {
        [styles['btn-m']]: type === 'medium',
        [styles['btn-m-flex']]: type === 'medium-flex',
        [styles['btn-l']]: type === 'large',
        [styles['btn-l-flex']]: type === 'large-flex',
        [styles['btn-rs']]: type === 'rounded-small',
        [styles['btn-nav-login']]: type === 'nav-login',
        [styles['btn-search']]: type === 'search',
    })

    const iconSrc = icon && `/src/assets/ButtonIcons/${icon}.svg`;


    return (
        <Link
            className={classNames(buttonClass)}
            title={text}
            to={to ? to : ''}
            onClick={onClick}
        >
            {text}
            {iconSrc && <img className={styles['btn-icon']} src={iconSrc}
							 width={iconWidth}/>}
        </Link>
    );
}

export default Button;
