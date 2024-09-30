import React, {useEffect} from 'react';
import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import SimpleHeaderContentTemplate
    from '../../templates/SimpleHeaderContentTemplate/SimpleHeaderContentTemplate.tsx';
import ProfilePageContent from './ProfilePageContent/ProfilePageContent.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';

const ProfilePage: React.FC = () => {

    useEffect(() => {
        document.title = 'DD || Мой профиль';
    }, []);

    const user = useSelector((state: RootState) => ({
        index: state.user.index,
        firstName: state.user.firstName,
        lastName: state.user.lastName,
        email: state.user.email,
        registrationDate: state.user.registrationDate,
    }));
    return (

        <>
            <Header>
                <HeaderNavigation/>
                <SimpleHeaderContentTemplate userFirstName={user.firstName}
                                             userLastName={user.lastName}
                                             registrationDate={user.registrationDate}/>
            </Header>
            <Content>
                <ProfilePageContent/>
            </Content>
            <Footer/>
        </>
    );
};

export default ProfilePage;
