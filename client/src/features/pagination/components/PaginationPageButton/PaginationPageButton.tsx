import React from 'react';

interface PaginationPageButtonProps {
    page: number
    onClick?: () => void
}

const PaginationPageButton: React.FC<PaginationPageButtonProps> = ({
                                                                       page,
                                                                       activePage,
                                                                       setActivePage
                                                                   }) => {

    const handleClick = () => {
        setActivePage(page);
    }

    return (
        <span onClick={handleClick}>
            {page}
        </span>
    );
};

export default PaginationPageButton;
