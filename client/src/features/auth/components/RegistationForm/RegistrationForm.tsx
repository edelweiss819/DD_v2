import React from 'react';
import styles from './RegistrationForm.module.scss';
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import {SubmitHandler, useForm} from 'react-hook-form';
import Button from '../../../../shared/ui/Button/Button.tsx';
import {Link} from 'react-router-dom';

interface IRegistrationForm {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
}

const ErrorMessage: React.FC<{
    field: keyof IRegistrationForm;
    errors: any;
}> = ({
          field,
          errors
      }) => {
    return (
        <>
            {errors[field] && <div
				className={styles['error']}>{errors[field].message}</div>}
        </>
    );
};


const RegistrationForm: React.FC = () => {

    const {
        register,
        handleSubmit,
        formState: {errors}
    } = useForm<IRegistrationForm>();

    // Убрать после того как переделаю хук
    const onSubmit: SubmitHandler<IRegistrationForm> = (userData) => {
        console.log('onSubmit вызван', userData);
        alert('Форма отправлена!');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles['grid']}>
            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    name={'email'}
                    type={'email'}
                    formType={'registration-form'}
                    placeholder={'Введите ваш email...'}
                    required
                    validation={{
                        required: 'Email обязателен',
                        pattern: {
                            value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                            message: 'Введите корректный email',
                        },
                    }}
                />
                <ErrorMessage field={'email'} errors={errors}/>
            </div>

            <div className={styles['grid-cell-half']}>
                <Input
                    register={register}
                    name={'firstName'}
                    type={'text'}
                    formType={'registration-form'}
                    placeholder={'Имя...'}
                    required
                    validation={{
                        required: 'Имя обязательно',
                        pattern: {
                            value: /^[a-zA-Z' -]+$/,
                            message: 'Введите корректное имя.'
                        }
                    }}
                />
                <ErrorMessage field={'firstName'} errors={errors}/>
            </div>
            <div className={styles['grid-cell-half']}>
                <Input
                    register={register}
                    name={'lastName'}
                    type={'text'}
                    formType={'registration-form'}
                    placeholder={'Фамилия...'}
                    required
                    validation={{
                        required: 'Фамилия обязательна',
                        pattern: {
                            value: /^[a-zA-Z' -]+$/,
                            message: 'Введите корректную фамилию'
                        }

                    }}
                />
                <ErrorMessage field={'lastName'} errors={errors}/>
            </div>

            <div className={styles['grid-cell-full']}>
                <Input
                    register={register}
                    name={'password'}
                    type={'password'}
                    formType={'registration-form'}
                    placeholder={'Пароль...'}
                    required
                    validation={{
                        required: 'Пароль обязателен',
                        pattern: {
                            value: /^[a-zA-Z0-9_]{10,}$/,
                            message: 'Введите корректный пароль'
                        }

                    }}
                />
                <ErrorMessage field={'password'} errors={errors}/>
            </div>

            <div className={styles['grid-cell-full']}>
                <Button text={'Зарегистрироваться'} type={'large-flex'}
                        color={'blue'} onClick={handleSubmit(onSubmit)}/>
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
