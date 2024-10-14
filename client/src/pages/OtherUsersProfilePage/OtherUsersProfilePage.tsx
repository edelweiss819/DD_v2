import React, {useEffect} from 'react';
import Header from '../../shared/ui/Header/Header.tsx';
import HeaderNavigation
    from '../../shared/ui/Header/HeaderNavigation/HeaderNavigation.tsx';
import Footer from '../../shared/ui/Footer/Footer.tsx';
import Content from '../../shared/ui/Content/Content.tsx';
import SimpleHeaderContentTemplate
    from '../../templates/SimpleHeaderContentTemplate/SimpleHeaderContentTemplate.tsx';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/store.ts';
import {useGetOtherUser} from '../../features/auth/hooks';
import {useParams} from 'react-router';
import OtherUsersProfilePageContent
    from './OtherUsersProfilePageContent/OtherUsersProfilePageContent.tsx';


const OtherUsersProfilePage: React.FC = () => {
    const {token} = useSelector((state: RootState) => state.user);
    const {index} = useParams();

    useEffect(() => {
        document.title = 'DD || Мой профиль';
    }, []);


    const {
        data: otherUser,
        isLoading
    } = useGetOtherUser(token!, [
        'firstName',
        'lastName',
        'registrationDate',
    ], Number(index));

    const user = {
        firstName: otherUser?.user.firstName || 'Неизвестное имя',
        lastName: otherUser?.user.lastName || 'Неизвестная фамилия',
        registrationDate: otherUser?.user.registrationDate || -1,
    }


    if (isLoading) {
        return null;
    }

    return (

        <>
            <Header>
                <HeaderNavigation/>
                <SimpleHeaderContentTemplate userFirstName={user.firstName}
                                             userLastName={user.lastName}
                                             registrationDate={user.registrationDate}/>
            </Header>
            <Content>
                <OtherUsersProfilePageContent/>
            </Content>
            <Footer/>
        </>
    );
};

export default OtherUsersProfilePage;
