import React from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';

const SingleArticlePage: React.FC = ({}) => {
    return (
        <div>
            <Header>
                <HeaderNavigation/>
            </Header>
        </div>
    );
};

export default SingleArticlePage;
