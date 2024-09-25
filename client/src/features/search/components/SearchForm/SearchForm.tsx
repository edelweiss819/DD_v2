import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import Input from '../../../../shared/ui/Forms/Input/Input.tsx';
import Button from '../../../../shared/ui/Button/Button.tsx';
import styles from './SearchForm.module.scss';
import {
    IFetchArticlesListByGenreAndWordsParams
} from '../../api';
import {
    useFetchArticlesListByGenreAndWords,
} from '../../hooks';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store/store.ts';
import {
    setArticlesList,
    setCurrentPage, setLastCursor,
    setSearchParams,
} from '../../../articles/slice/articlesListSlice.ts';
import BaseSelect
    from '../../../../shared/ui/Selects/BaseSelects/BaseSelect.tsx';
import {GENRES} from '../../../../constants';
import {useFetchArticlesList} from '../../../articles/hooks';
import {useLocation, useNavigate} from 'react-router';

export interface FormValues {
    'search-input': string;
}

export interface GenreOption {
    value: string;
    label: string;
}

const SearchForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const {
        register,
        handleSubmit
    } = useForm<FormValues>();

    const navigate = useNavigate();
    const location = useLocation();

    const [params, setParams] = useState<IFetchArticlesListByGenreAndWordsParams>();
    const [genre1, setGenre1] = useState<string>('');
    const [genre2, setGenre2] = useState<string>('');
    const [genre3, setGenre3] = useState<string>('');
    const [genre4, setGenre4] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const selectedGenres = [
        genre1,
        genre2,
        genre3,
        genre4
    ];

    const {
        data: foundArticleList,
        error
    } = useFetchArticlesListByGenreAndWords(params);


    const {data: defaultArticleList} = useFetchArticlesList(1);


    useEffect(() => {
        if (foundArticleList) {
            dispatch(setArticlesList(foundArticleList));
            setErrorMessage(null);
        } else if (error) {
            const message = error.response?.data?.message;
            setErrorMessage(message);
            (defaultArticleList && dispatch(setArticlesList(defaultArticleList)));
        }
    }, [
                  dispatch,
                  foundArticleList,
                  error,
                  defaultArticleList,
              ]);

    const genreOptions = (currentGenre: string): GenreOption[] => {
        const entireGenres: GenreOption[] = [
            {
                value: '',
                label: '—'
            },
            ...Object.keys(GENRES).map((key) => ({
                value: key,
                label: GENRES[key],
            })),
        ];
        const filteredGenres = entireGenres.filter(
            (genre) => genre.value === '' || genre.value === currentGenre || !selectedGenres.includes(genre.value)
        );

        return filteredGenres;
    };

    const onSubmit = (data: FormValues) => {
        const newParams: IFetchArticlesListByGenreAndWordsParams = {
            page: 1,
            genres: selectedGenres.filter(Boolean).join(','),
            s: data['search-input'].toString(),
            limit: 10,
            lastCursor: 0,
        };

        if (selectedGenres.filter(Boolean).length === 0 && newParams.s === '') {
            (defaultArticleList && dispatch(setArticlesList(defaultArticleList)));
            navigate('/');
        } else {
            setParams(newParams);
            dispatch(setCurrentPage(1));
            dispatch(setSearchParams(newParams));
            dispatch(setLastCursor(0))
            console.log(newParams);
            if (location.pathname !== '/search') {
                navigate('/search')
            }

        }
    };


    return (
        <div className={styles['form-container']}>
            <form onSubmit={handleSubmit(onSubmit)}
                  className={styles['search-form']}>
                <Input
                    type="input-search"
                    register={register}
                    name="search-input"
                    required={false}
                    placeholder="Введите запрос.."
                />
                <Button text="Поиск" type={'search-m'} color={'dark-blue'}
                        onClick={handleSubmit(onSubmit)}/>
            </form>
            <div className={styles['genres-container']}>
                <BaseSelect options={genreOptions(genre1)}
                            selectedValue={genre1}
                            type={'select-search-options'}
                            onChange={setGenre1}/>
                <BaseSelect options={genreOptions(genre2)}
                            selectedValue={genre2}
                            type={'select-search-options'}
                            onChange={setGenre2}/>
                <BaseSelect options={genreOptions(genre3)}
                            selectedValue={genre3}
                            type={'select-search-options'}
                            onChange={setGenre3}/>
                <BaseSelect options={genreOptions(genre4)}
                            selectedValue={genre4}
                            type={'select-search-options'}
                            onChange={setGenre4}/>
            </div>
            {errorMessage &&
				<div className={styles['error']}>
					<span className={styles['error-text']}>{errorMessage}</span>
				</div>}
        </div>
    );
};

export default SearchForm;
