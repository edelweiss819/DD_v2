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
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, RootState} from '../../../../store/store.ts';
import {
    setArticlesList,
    setCurrentPage, setGlobalGenres, setLastCursor,
    setSearchParams, setSortOrder, updateLastCursor,
} from '../../../articles/slice/articlesListSlice.ts';
import BaseSelect
    from '../../../../shared/ui/Selects/BaseSelects/BaseSelect.tsx';
import {GENRES} from '../../../../constants';
import {useFetchArticlesList} from '../../../articles/hooks';
import {useLocation, useNavigate} from 'react-router';
import {AxiosError} from 'axios';


interface ErrorResponse {
    message: string;
}

export interface FormValues {
    'search-input': string;
}

export interface GenreOption {
    value: string;
    label: string;
}

const SearchForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {globalGenres} = useSelector((state: RootState) => state.articlesList);
    const {
        register,
        handleSubmit
    } = useForm<FormValues>();

    const navigate = useNavigate();
    const location = useLocation();

    const [params, setParams] = useState<IFetchArticlesListByGenreAndWordsParams>();
    const [genre1, setGenre1] = useState<string>(globalGenres[0] || '');
    const [genre2, setGenre2] = useState<string>(globalGenres[1] || '');
    const [genre3, setGenre3] = useState<string>(globalGenres[2] || '');
    const [genre4, setGenre4] = useState<string>(globalGenres[3] || '');

    useEffect(() => {

        setGenre1(globalGenres[0] || '');
        setGenre2(globalGenres[1] || '');
        setGenre3(globalGenres[2] || '');
        setGenre4(globalGenres[3] || '');
    }, [globalGenres]);


    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // const selectedGenres = [
    //     genre1,
    //     genre2,
    //     genre3,
    //     genre4
    // ];
    const selectedGenres = globalGenres;


    const {
        data: foundArticleList,
        error
    } = useFetchArticlesListByGenreAndWords(params!);


    const {data: defaultArticleList} = useFetchArticlesList(1);


    useEffect(() => {
        if (foundArticleList) {
            dispatch(setArticlesList(foundArticleList.articles));
            setErrorMessage(null);
        } else if (error) {
            const response = (error as AxiosError).response;
            if (response && response.data && typeof response.data === 'object' && 'message' in response.data) {
                const message = (response.data as ErrorResponse).message;
                setErrorMessage(message);
            } else {
                return;
            }
            if (defaultArticleList) {
                dispatch(setArticlesList(defaultArticleList));
            }
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
            dispatch(setLastCursor(0));
            dispatch(updateLastCursor(0));
            dispatch(setSortOrder(1));
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
                    type={'text'}
                    formType="input-search"
                    register={register}
                    name="search-input"
                    required={false}
                    placeholder="Введите запрос.."
                />
                <Button text="Поиск" color={'dark-blue'} type={'search'}
                        onClick={handleSubmit(onSubmit)}/>
            </form>
            <div className={styles['genres-container']}>
                <BaseSelect
                    options={genreOptions(genre1)}
                    selectedValue={genre1}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     value,
                                                     globalGenres[1],
                                                     globalGenres[2],
                                                     globalGenres[3]
                                                 ]))
                    }
                />


                <BaseSelect
                    options={genreOptions(genre2)}
                    selectedValue={genre2}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     value,
                                                     globalGenres[2],
                                                     globalGenres[3]
                                                 ]))
                    }
                />

                <BaseSelect
                    options={genreOptions(genre3)}
                    selectedValue={genre3}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     globalGenres[1],
                                                     value,
                                                     globalGenres[3]
                                                 ]))
                    }
                />

                <BaseSelect
                    options={genreOptions(genre4)}
                    selectedValue={genre4}
                    type={'select-search-options'}
                    onChange={(value) =>
                        dispatch(setGlobalGenres([
                                                     globalGenres[0],
                                                     globalGenres[1],
                                                     globalGenres[2],
                                                     value
                                                 ]))
                    }
                />

            </div>
            {errorMessage &&
				<div className={styles['error']}>
					<span className={styles['error-text']}>{errorMessage}</span>
				</div>}
        </div>
    );
};

export default SearchForm;
