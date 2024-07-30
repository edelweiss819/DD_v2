import React from 'react';
import Button from '../button/Button.tsx';
import styles from './ButtonBlock.module.scss'

const ButtonsBlock: React.FC = () => (
    <div className={styles.buttonBlock}>
        <Button text={'Жанры'} color={'blue'}/>
        <Button text={'Любимое'} color={'red'}/>
        <Button text={'Что-то еще'} color={'green'}/>
    </div>

);

export default ButtonsBlock;