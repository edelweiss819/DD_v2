import React, {Suspense} from 'react';
import {Routes, Route} from 'react-router-dom';
import {HEADER_NAVIGATION_PAGES} from '../constants';

const MainPage = React.lazy(() => import('../pages/MainPage/MainPage.tsx'));
const SingleArticlePage = React.lazy(() => import('../pages/SingleArticlePage/SingleArticlePage.tsx'));
const GenresPage = React.lazy(() => import('../pages/GenresPage/GenresPage.tsx'));
const SingleGenrePage = React.lazy(() => import('../pages/SingleGenrePage/SingleGenrePage.tsx'));
const SearchPage = React.lazy(() => import('../pages/SearchPage/SearchPage.tsx'));
const SignUpPage = React.lazy(() => import('../pages/SignUpPage/SignUpPage.tsx'));
const SignInPage = React.lazy(() => import('../pages/SignInPage/SignInPage.tsx'));

const AppRoutes: React.FC = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path={HEADER_NAVIGATION_PAGES['Главная']}
                       element={<MainPage/>}/>
                <Route path="articles/:index" element={<SingleArticlePage/>}/>
                <Route path={HEADER_NAVIGATION_PAGES['Жанры']}
                       element={<GenresPage/>}/>
                <Route path="/genres/:genre" element={<SingleGenrePage/>}/>
                <Route path="/search" element={<SearchPage/>}/>
                <Route path={'/sign_up'} element={<SignUpPage/>}/>
                <Route path={'/sign_in'} element={<SignInPage/>}/>

            </Routes>
        </Suspense>
    );
};

export default AppRoutes;
