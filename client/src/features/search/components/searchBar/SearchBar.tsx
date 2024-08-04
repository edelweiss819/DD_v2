import React, {useState} from 'react';
import Input from '../../../../components/input/Input.tsx';
import SelectContainer
    from '../../../../components/selectContainer/SelectContainer.tsx';
import Button from '../../../../components/button/Button.tsx';
import styles from '../searchBar/SearchBar.module.scss';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../../../../store/store.ts';
import {
    loadFilteredArticles, setSearchParameters
} from '../../../articles/slice/articlesSlice.ts';


const SearchBar: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const dispatch = useDispatch<AppDispatch>();

    const handleButtonClick = () => {
        dispatch(setSearchParameters(value));
        dispatch(loadFilteredArticles({p: value, page: 1}));
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }


    return (
        <>
            <div className={styles['search-bar-input-container']}>
                <Input
                    placeholder={'Введите запрос..'}
                    onChange={handleInputChange}
                    value={value}/>
                <Button text={'Поиск'}
                        color={'search'}
                        onClick={handleButtonClick}/>
            </div>
            <SelectContainer/>
        </>
    );
};

export default SearchBar;
