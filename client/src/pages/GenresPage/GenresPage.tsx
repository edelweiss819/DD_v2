import React, {useEffect} from 'react';
import Header from '../../components/Header/Header.tsx';
import HeaderNavigation
    from '../../components/Header/HeaderNavigation/HeaderNavigation.tsx';
import HeaderContent
    from '../../components/Header/HeaderContent/HeaderContent.tsx';
import Footer from '../../components/Footer/Footer.tsx';
import Content from '../../components/Content/Content.tsx';
import GenresPageContent from './GenresPageContent/GenresPageContent.tsx';

const GenresPage: React.FC = () => {

    useEffect(() => {
        document.title = 'DD || Жанры';
    }, []);


    return (
        <>
            <Header>
                <HeaderNavigation/>
                <HeaderContent/>
            </Header>
            <Content>
                <GenresPageContent/>
            </Content>
            <Footer/>
        </>
    );
};

export default GenresPage;
