import React from 'react';
import styles from './RegistrationForm.module.scss';
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import {useForm} from 'react-hook-form';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {Link} from 'react-router-dom';

const RegistrationForm: React.FC = () => {
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

            <div className={styles['grid-cell-half']}>
                <Input
                    register={register}
                    name={'first-name'}
                    type={'registration-form'}
                    placeholder={'Имя...'}
                />
            </div>
            <div className={styles['grid-cell-half']}>
                <Input
                    register={register}
                    name={'last-name'}
                    type={'registration-form'}
                    placeholder={'Фамилия...'}
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
                <Button text={'Зарегистрироваться'} type={'large-flex'}
                        color={'blue'}/>
            </div>
            <div className={styles['grid-cell-full']}>
                <span
                    className={styles['text']}>Уже зарегистрированы? - &nbsp;</span>
                <Link className={styles['text-link']} to={'/sign_in'}>
                    Войти
                </Link>
            </div>
        </form>
    );
};

export default RegistrationForm;
