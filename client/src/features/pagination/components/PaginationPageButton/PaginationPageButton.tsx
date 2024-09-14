import React from 'react';
import Button from '../../../../components/Button/Button.tsx';

interface PaginationPageButtonProps {
    page: number
}

const PaginationPageButton: React.FC<PaginationPageButtonProps> = ({page}) => {
    return (
        <Button text={`${page}`} type={'small'}/>
    );
};

export default PaginationPageButton;
