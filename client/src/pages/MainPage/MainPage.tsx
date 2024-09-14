import React from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import MainContent from '../../components/MainContent/MainContent.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import HeaderContent
    from '../../components/Header/HeaderContent/HeaderContent.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';

const MainPage: React.FC = ({}) => {
    const {
        articlesList,
    } = useSelector((state: RootState) => state.articlesList);

    return (
        <>
            <Header>
                <HeaderNavigation/>
                <HeaderContent/>
            </Header>
            <MainContent articlesList={articlesList}/>
            <Footer/>
        </>
    );
};

export default MainPage;
