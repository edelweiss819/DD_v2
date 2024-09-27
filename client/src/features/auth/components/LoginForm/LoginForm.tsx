import React from 'react';
import {useForm} from 'react-hook-form';
import styles from './LoginForm.module.scss'
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {Link} from 'react-router-dom';

const LoginForm: React.FC = ({}) => {

    const {
        register,
        handleSubmit
    } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['grid']}>
            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    name={'email'}
                    type={'registration-form'}
                    placeholder={'Введите ваш email...'}
                />
            </div>

            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    name={'password'}
                    type={'registration-form'}
                    placeholder={'Пароль...'}
                />
            </div>

            <div
                className={styles['grid-cell-full']}>
                <Button text={'Войти'} type={'large-flex'}
                        color={'blue'}/>
            </div>
            <div className={styles['grid-cell-full']}>
                <span
                    className={styles['text']}>Нужно создать аккаунт? - &nbsp;</span>
                <Link className={styles['text-link']} to={'/sign_up'}>
                    Зарегистрироваться
                </Link>
            </div>
        </form>
    );
};

export default LoginForm;
