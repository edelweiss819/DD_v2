import React from 'react';
import {Link} from 'react-router-dom';
import styles from './Button.module.scss';
import classNames from 'classnames';

// @ts-ignore
import SignUpArrow from '../../../assets/ButtonIcons/SignUpArrow.svg?react';
// @ts-ignore
import Google from '../../../assets/ButtonIcons/Google.svg?react';
// @ts-ignore
import Facebook from '../../../assets/ButtonIcons/Facebook.svg?react';


export enum ButtonColor {
    BLUE = 'blue',
    GREY = 'grey',
    DARK_BLUE = 'dark-blue',
    WHITE = 'white',
    RED = 'red'
}

export enum ButtonIcon {
    SIGN_UP_ARROW = 'SignUpArrow',
    GOOGLE = 'Google',
    FACEBOOK = 'Facebook'
}

export enum ButtonType {
    SMALL = 'small',
    MEDIUM = 'medium',
    MEDIUM_FLEX = 'medium-flex',
    LARGE = 'large',
    LARGE_FLEX = 'large-flex',
    NAV_LOGIN = 'nav-login',
    ROUNDED_SMALL = 'rounded-small',
    SEARCH = 'search'
}

export type ButtonTextRespond = boolean;

interface ButtonProps {
    text: string;
    textRespond?: ButtonTextRespond;
    to?: string;
    color?: ButtonColor;
    icon?: ButtonIcon;
    iconWidth?: number | string;
    type: ButtonType;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
                                           text,
                                           textRespond,
                                           to,
                                           color,
                                           icon,
                                           iconWidth,
                                           type,
                                           onClick,
                                       }) => {
    const colorClass = classNames({
                                      [styles['btn-blue']]: color === ButtonColor.BLUE,
                                      [styles['btn-red']]: color === ButtonColor.RED,
                                      [styles['btn-grey']]: color === ButtonColor.GREY,
                                      [styles['btn-white']]: color === ButtonColor.WHITE,
                                      [styles['btn-dark-blue']]: color === ButtonColor.DARK_BLUE,
                                  });

    const textClass = textRespond ? styles['btn-text-respond'] : '';

    const buttonClass = classNames(styles['btn'], colorClass, {
        [styles['btn-m']]: type === ButtonType.MEDIUM,
        [styles['btn-m-flex']]: type === ButtonType.MEDIUM_FLEX,
        [styles['btn-l']]: type === ButtonType.LARGE,
        [styles['btn-l-flex']]: type === ButtonType.LARGE_FLEX,
        [styles['btn-rs']]: type === ButtonType.ROUNDED_SMALL,
        [styles['btn-nav-login']]: type === ButtonType.NAV_LOGIN,
        [styles['btn-search']]: type === ButtonType.SEARCH,
    });

    const iconSrc = icon === ButtonIcon.SIGN_UP_ARROW ? SignUpArrow
        : icon === ButtonIcon.GOOGLE ? Google
            : icon === ButtonIcon.FACEBOOK ? Facebook
                : undefined;


    return (
        <Link
            className={buttonClass}
            title={text}
            to={to ? to : ''}
            onClick={onClick}
        >
            <span className={textClass}>{text}</span>
            {iconSrc && (
                <img className={styles['btn-icon']} src={iconSrc}
                     width={iconWidth} alt={icon}/>
            )}
        </Link>
    );
};

export default Button;

