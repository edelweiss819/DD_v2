import React from 'react';
// @ts-ignore
import DefaultAvatar
    from '../../../../assets/Avatars/DefaultAvatar/DefaultAvatar.svg?react';
import {Link} from 'react-router-dom';
import styles from './UserAvatar.module.scss';

export interface UserAvatarProps {
    avatarUrl: string;
    userIndex: number;
    width?: number;
    height?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
                                                   avatarUrl,
                                                   userIndex,
                                                   width = 24,
                                                   height = 24
                                               }) => {
    const avatarSrc = avatarUrl === 'defaultAvatar' ? DefaultAvatar : avatarUrl;

    return (
        <Link to={`/user/${userIndex}`}>
            <img className={styles['user-avatar-container']} src={avatarSrc}
                 width={width}
                 height={height}
                 alt="User Avatar"/>
        </Link>
    );
};

export default UserAvatar;
