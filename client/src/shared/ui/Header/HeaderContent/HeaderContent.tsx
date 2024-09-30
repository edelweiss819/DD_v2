import React from 'react';
import styles from './HeaderContent.module.scss'
import Button from '../../Button/Button.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../store/store.ts';

const HeaderContent: React.FC = () => {
    const {isAuthorized} = useSelector((state: RootState) => state.user);
    return (
        <div className={styles.container}>
            <div className={styles['left-block']}>
                <h1 className={styles['description-xl']}>
                    Тысячи коротких рассказов для чтения онлайн
                </h1>
                <p className={styles['description-l']}>
                    Погрузитесь в мир увлекательных рассказов — каждую неделю
                    новые истории от талантливых авторов!
                </p>
                {!isAuthorized && <div className={styles['btns-container']}>
					<Button type={'medium'} text={'Sign Up'} color={'blue'}
							icon={'SignUpArrow'} iconWidth={'24'}/>
					<Button type={'medium'} text={'Sign In With Google'}
							color={'grey'} icon={'Google'} iconWidth={'24'}/>
					<Button type={'medium'} text={'Facebook'}
							color={'dark-blue'} icon={'Facebook'}
							iconWidth={'24'}/>
				</div>}
            </div>
            <div className={styles['right-block']}></div>
        </div>
    )
}

export default HeaderContent;