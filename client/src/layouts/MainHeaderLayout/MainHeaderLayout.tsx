import React from 'react';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import HeaderContent
    from '../../components/Header/HeaderContent/HeaderContent.tsx';
import Header from '../../components/Header/Header.tsx';

const MainHeaderLayout: React.FC = () => {
    return (
        <Header>
            <HeaderNavigation/>
            <HeaderContent/>
        </Header>
    );
};

export default MainHeaderLayout;
