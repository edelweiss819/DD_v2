import React, {useState} from 'react';
import Select from '../selects/Select.tsx';
import styles from './SelectContainer.module.scss'

const options = [
    {value: 'option1', label: 'Option 1'},
    {value: 'option2', label: 'Option 2'},
    {value: 'option3', label: 'Option 3'},
];

const SelectContainer: React.FC = () => {
    const [selectedOption1, setSelectedOption1] = useState<string>('option1');
    const [selectedOption2, setSelectedOption2] = useState<string>('option1');
    const [selectedOption3, setSelectedOption3] = useState<string>('option1');

    const handleSelectChange1 = (value: string) => {
        setSelectedOption1(value);
    };

    const handleSelectChange2 = (value: string) => {
        setSelectedOption2(value);
    };

    const handleSelectChange3 = (value: string) => {
        setSelectedOption3(value);
    };

    return (
        <div className={styles['select-container']}>
            <Select
                options={options}
                value={selectedOption1}
                onChange={handleSelectChange1}
            />
            <Select
                options={options}
                value={selectedOption2}
                onChange={handleSelectChange2}
            />
            <Select
                options={options}
                value={selectedOption3}
                onChange={handleSelectChange3}
            />
            <Select
                options={options}
                value={selectedOption3}
                onChange={handleSelectChange3}
            />
        </div>
    );
};

export default SelectContainer;
